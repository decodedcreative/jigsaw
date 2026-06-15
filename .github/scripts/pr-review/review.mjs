#!/usr/bin/env node

import {
  MAX_INLINE_COMMENTS,
  REVIEW_MARKER,
  getProvider,
  selectReviewableFiles,
} from "./lib/config.mjs";
import { buildLineIndex } from "./lib/diff.mjs";
import {
  fetchPullFiles,
  fetchPullRequest,
  postPullRequestReview,
} from "./lib/github.mjs";
import { providerLabel, requestReview } from "./lib/model.mjs";
import {
  formatCommentBody,
  formatReviewSummary,
  parseReviewJson,
} from "./lib/parse-review.mjs";
import { SYSTEM_PROMPT, buildUserPrompt } from "./lib/prompt.mjs";

const { GITHUB_TOKEN, GITHUB_REPOSITORY, PR_NUMBER } = process.env;

function requireEnv(name, value) {
  if (!value) {
    console.error(`Missing required env: ${name}`);
    process.exit(1);
  }
  return value;
}

/**
 * @param {Array<{ path: string; line: number; severity: string; body: string }>} comments
 * @param {Map<string, Set<number>>} lineIndex
 */
function validateComments(comments, lineIndex) {
  const valid = [];
  let skippedUnknownPath = 0;
  let skippedInvalidLine = 0;
  let skippedOverCap = 0;

  for (const comment of comments) {
    if (valid.length >= MAX_INLINE_COMMENTS) {
      skippedOverCap += 1;
      continue;
    }

    const lines = lineIndex.get(comment.path);
    if (!lines) {
      console.warn(
        `Skipping ${comment.path}:${comment.line} — file not in review set (filtered out or missing patch)`,
      );
      skippedUnknownPath += 1;
      continue;
    }

    if (!lines.has(comment.line)) {
      console.warn(
        `Skipping ${comment.path}:${comment.line} — line not in diff hunks (invalid line number)`,
      );
      skippedInvalidLine += 1;
      continue;
    }

    valid.push({
      path: comment.path,
      line: comment.line,
      body: formatCommentBody(comment.severity, comment.body),
    });
  }

  const skipped = skippedUnknownPath + skippedInvalidLine + skippedOverCap;
  if (skipped > 0) {
    console.warn(
      `Comment validation: kept ${valid.length}, skipped ${skipped} (${skippedUnknownPath} unknown path, ${skippedInvalidLine} invalid line, ${skippedOverCap} over cap of ${MAX_INLINE_COMMENTS})`,
    );
  }

  return valid;
}

async function main() {
  const token = requireEnv("GITHUB_TOKEN", GITHUB_TOKEN);
  const repo = requireEnv("GITHUB_REPOSITORY", GITHUB_REPOSITORY);
  const pullNumber = Number.parseInt(requireEnv("PR_NUMBER", PR_NUMBER), 10);
  const provider = getProvider();

  if (!Number.isFinite(pullNumber)) {
    console.error("PR_NUMBER must be a valid integer");
    process.exit(1);
  }

  console.log(`Reviewing ${repo}#${pullNumber} via ${provider}…`);

  const pr = await fetchPullRequest(token, repo, pullNumber);
  const allFiles = await fetchPullFiles(token, repo, pullNumber);
  const files = selectReviewableFiles(allFiles);

  if (files.length === 0) {
    console.log("No reviewable files after filters — skipping.");
    return;
  }

  console.log(`Selected ${files.length} reviewable file(s):`);
  for (const file of files) {
    console.log(`  - ${file.filename}`);
  }

  console.log(`Sending ${files.length} file(s) to model…`);

  const userPrompt = buildUserPrompt({
    title: pr.title,
    body: pr.body ?? "",
    author: pr.user?.login ?? "unknown",
    base: pr.base?.ref ?? "main",
    head: pr.head?.ref ?? "head",
    files,
  });

  const raw = await requestReview(SYSTEM_PROMPT, userPrompt);
  const { summary, comments } = parseReviewJson(raw);
  const lineIndex = buildLineIndex(files);
  const inlineComments = validateComments(comments, lineIndex);

  const reviewBody = formatReviewSummary(
    summary,
    comments,
    REVIEW_MARKER,
    providerLabel(provider),
  );

  if (inlineComments.length === 0) {
    console.log("No inline comments to post — summary only.");
  }

  await postPullRequestReview(
    token,
    repo,
    pullNumber,
    pr.head.sha,
    reviewBody,
    inlineComments,
  );

  console.log(
    `Posted review with ${inlineComments.length} inline comment(s).`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
