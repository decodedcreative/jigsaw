#!/usr/bin/env node

import { acknowledgeAddressedComments } from "./lib/acknowledge.mjs";
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
  fetchPullReviews,
  postPullRequestReview,
} from "./lib/github.mjs";
import { providerLabel, requestReview } from "./lib/model.mjs";
import {
  formatCommentBody,
  formatReviewSummary,
  parseReviewJson,
} from "./lib/parse-review.mjs";
import { buildSystemPrompt, buildUserPrompt } from "./lib/prompt.mjs";
import {
  countPriorStaffReviews,
  filterCommentsForMode,
  getLatestStaffReviewSummary,
  getMaxCommentsForMode,
  getMaxFeedbackRounds,
  getReviewMode,
  roundLabel,
} from "./lib/rounds.mjs";

const { GITHUB_TOKEN, GITHUB_REPOSITORY, PR_NUMBER, BEFORE_SHA, AFTER_SHA } =
  process.env;

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
 * @param {number} maxComments
 */
function validateComments(comments, lineIndex, maxComments) {
  const valid = [];
  let skippedUnknownPath = 0;
  let skippedInvalidLine = 0;
  let skippedOverCap = 0;

  for (const comment of comments) {
    if (valid.length >= maxComments) {
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
      `Comment validation: kept ${valid.length}, skipped ${skipped} (${skippedUnknownPath} unknown path, ${skippedInvalidLine} invalid line, ${skippedOverCap} over cap of ${maxComments})`,
    );
  }

  return valid;
}

async function main() {
  const token = requireEnv("GITHUB_TOKEN", GITHUB_TOKEN);
  const repo = requireEnv("GITHUB_REPOSITORY", GITHUB_REPOSITORY);
  const pullNumber = Number.parseInt(requireEnv("PR_NUMBER", PR_NUMBER), 10);
  const provider = getProvider();
  const maxFeedbackRounds = getMaxFeedbackRounds();

  if (!Number.isFinite(pullNumber)) {
    console.error("PR_NUMBER must be a valid integer");
    process.exit(1);
  }

  const priorReviews = await fetchPullReviews(token, repo, pullNumber);
  const priorCount = countPriorStaffReviews(priorReviews ?? []);
  const mode = getReviewMode(priorCount, maxFeedbackRounds);
  const roundNumber = priorCount + 1;
  const maxComments = Math.min(
    MAX_INLINE_COMMENTS,
    getMaxCommentsForMode(mode),
  );

  console.log(
    `Reviewing ${repo}#${pullNumber} via ${provider} — mode=${mode}, round=${roundNumber}, maxFeedbackRounds=${maxFeedbackRounds}`,
  );

  const pr = await fetchPullRequest(token, repo, pullNumber);
  const afterSha = AFTER_SHA || pr.head.sha;

  const acknowledged = await acknowledgeAddressedComments(
    token,
    repo,
    pullNumber,
    BEFORE_SHA,
    afterSha,
    priorCount,
  );

  const allFiles = await fetchPullFiles(token, repo, pullNumber);
  if (acknowledged > 0) {
    console.log(`Posted ${acknowledged} addressed reply(ies) on prior inline comments.`);
  }

  const files = selectReviewableFiles(allFiles);

  if (files.length === 0) {
    console.log("No reviewable files after filters — skipping.");
    return;
  }

  console.log(`Selected ${files.length} reviewable file(s):`);
  for (const file of files) {
    console.log(`  - ${file.filename}`);
  }

  const priorReviewSummary =
    mode !== "initial"
      ? getLatestStaffReviewSummary(priorReviews ?? [])
      : null;

  const userPrompt = buildUserPrompt({
    title: pr.title,
    body: pr.body ?? "",
    author: pr.user?.login ?? "unknown",
    base: pr.base?.ref ?? "main",
    head: pr.head?.ref ?? "head",
    mode,
    roundNumber,
    maxFeedbackRounds,
    priorReviewSummary,
    files,
  });

  console.log(`Sending ${files.length} file(s) to model…`);

  const raw = await requestReview(buildSystemPrompt(mode), userPrompt);
  const { summary, comments: rawComments } = parseReviewJson(raw);
  const modeComments = filterCommentsForMode(rawComments, mode);
  const lineIndex = buildLineIndex(files);
  const inlineComments = validateComments(modeComments, lineIndex, maxComments);

  if (mode === "critical" && inlineComments.length === 0) {
    console.log(
      "Critical-only round: no blockers found — skipping review post to avoid noise.",
    );
    return;
  }

  const reviewBody = formatReviewSummary(
    summary,
    modeComments,
    REVIEW_MARKER,
    providerLabel(provider),
    roundLabel(mode, roundNumber, maxFeedbackRounds),
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
