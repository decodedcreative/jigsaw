#!/usr/bin/env node

import {
  MAX_INLINE_COMMENTS,
  REVIEW_MARKER,
  selectReviewableFiles,
} from "./lib/config.mjs";
import { buildLineIndex } from "./lib/diff.mjs";
import { requestReview } from "./lib/anthropic.mjs";
import {
  fetchPullFiles,
  fetchPullRequest,
  postPullRequestReview,
} from "./lib/github.mjs";
import {
  formatCommentBody,
  formatReviewSummary,
  parseReviewJson,
} from "./lib/parse-review.mjs";
import { SYSTEM_PROMPT, buildUserPrompt } from "./lib/prompt.mjs";

const {
  GITHUB_TOKEN,
  ANTHROPIC_API_KEY,
  GITHUB_REPOSITORY,
  PR_NUMBER,
} = process.env;

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

  for (const comment of comments) {
    const lines = lineIndex.get(comment.path);
    if (!lines?.has(comment.line)) {
      console.warn(
        `Skipping comment on ${comment.path}:${comment.line} — not in diff hunks`,
      );
      continue;
    }

    valid.push({
      path: comment.path,
      line: comment.line,
      body: formatCommentBody(comment.severity, comment.body),
    });

    if (valid.length >= MAX_INLINE_COMMENTS) break;
  }

  return valid;
}

async function main() {
  const token = requireEnv("GITHUB_TOKEN", GITHUB_TOKEN);
  const apiKey = requireEnv("ANTHROPIC_API_KEY", ANTHROPIC_API_KEY);
  const repo = requireEnv("GITHUB_REPOSITORY", GITHUB_REPOSITORY);
  const pullNumber = Number.parseInt(requireEnv("PR_NUMBER", PR_NUMBER), 10);

  if (!Number.isFinite(pullNumber)) {
    console.error("PR_NUMBER must be a valid integer");
    process.exit(1);
  }

  console.log(`Reviewing ${repo}#${pullNumber}…`);

  const pr = await fetchPullRequest(token, repo, pullNumber);
  const allFiles = await fetchPullFiles(token, repo, pullNumber);
  const files = selectReviewableFiles(allFiles);

  if (files.length === 0) {
    console.log("No reviewable files after filters — skipping.");
    return;
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

  const raw = await requestReview(apiKey, SYSTEM_PROMPT, userPrompt);
  const { summary, comments } = parseReviewJson(raw);
  const lineIndex = buildLineIndex(files);
  const inlineComments = validateComments(comments, lineIndex);

  const reviewBody = formatReviewSummary(summary, comments, REVIEW_MARKER);

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
