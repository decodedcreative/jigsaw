import assert from "node:assert/strict";
import test from "node:test";

import { shouldSkipPath, selectReviewableFiles } from "./lib/config.mjs";
import { parseReviewableLines } from "./lib/diff.mjs";
import { isGitHubRateLimited } from "./lib/github.mjs";
import { parseReviewJson } from "./lib/parse-review.mjs";
import {
  countPriorStaffReviews,
  filterCommentsForMode,
  getMaxFeedbackRounds,
  getReviewMode,
} from "./lib/rounds.mjs";

test("parseReviewableLines tracks RIGHT-side line numbers", () => {
  const patch = [
    "@@ -1,3 +1,4 @@",
    " context",
    "-removed",
    "+added",
    " tail",
  ].join("\n");

  const lines = parseReviewableLines(patch);
  assert.deepEqual([...lines].sort((a, b) => a - b), [1, 2, 3]);
});

test("shouldSkipPath ignores generated token exports", () => {
  assert.equal(
    shouldSkipPath("packages/tokens/figma/shared.tokens.json"),
    true,
  );
  assert.equal(shouldSkipPath("packages/tokens/src/tokens/shared.json"), false);
});

test("selectReviewableFiles caps and filters", () => {
  const files = selectReviewableFiles([
    {
      filename: "package-lock.json",
      status: "modified",
      patch: "@@ +1,1 @@\n+1",
    },
    {
      filename: "packages/design-system/src/Button.tsx",
      status: "modified",
      patch: "@@ -1,1 +1,2 @@\n line\n+added",
    },
  ]);

  assert.equal(files.length, 1);
  assert.equal(files[0].filename, "packages/design-system/src/Button.tsx");
});

test("parseReviewJson accepts fenced JSON", () => {
  const parsed = parseReviewJson(
    '```json\n{"summary":"ok","comments":[{"path":"a.ts","line":1,"severity":"nit","body":"note"}]}\n```',
  );

  assert.equal(parsed.summary, "ok");
  assert.equal(parsed.comments.length, 1);
});

test("isGitHubRateLimited detects 429 and exhausted quota", () => {
  assert.equal(isGitHubRateLimited(new Response("", { status: 429 })), true);
  assert.equal(
    isGitHubRateLimited(
      new Response("", {
        status: 403,
        headers: { "x-ratelimit-remaining": "0" },
      }),
    ),
    true,
  );
  assert.equal(
    isGitHubRateLimited(
      new Response("", {
        status: 403,
        headers: { "x-ratelimit-remaining": "42" },
      }),
    ),
    false,
  );
});

test("getReviewMode caps feedback rounds then switches to critical", () => {
  const max = getMaxFeedbackRounds(2);
  assert.equal(getReviewMode(0, max), "initial");
  assert.equal(getReviewMode(1, max), "followup");
  assert.equal(getReviewMode(2, max), "critical");
  assert.equal(getReviewMode(5, max), "critical");
});

test("filterCommentsForMode keeps blockers only in critical mode", () => {
  const comments = [
    { severity: "blocker", path: "a.ts", line: 1, body: "x" },
    { severity: "nit", path: "b.ts", line: 2, body: "y" },
  ];
  assert.equal(filterCommentsForMode(comments, "initial").length, 2);
  assert.equal(filterCommentsForMode(comments, "critical").length, 1);
});

test("countPriorStaffReviews counts bot reviews with marker", () => {
  const count = countPriorStaffReviews([
    { user: { login: "github-actions[bot]" }, body: "<!-- jigsaw-staff-pr-review -->\nhi" },
    { user: { login: "human" }, body: "<!-- jigsaw-staff-pr-review -->\nhi" },
    { user: { login: "github-actions[bot]" }, body: "no marker" },
  ]);
  assert.equal(count, 1);
});
