import assert from "node:assert/strict";
import test from "node:test";

import { shouldSkipPath, selectReviewableFiles } from "./lib/config.mjs";
import { parseReviewableLines } from "./lib/diff.mjs";
import { isGitHubRateLimited } from "./lib/github.mjs";
import { parseReviewJson } from "./lib/parse-review.mjs";
import {
  DEFAULT_PROFILE,
  THOROUGH_PROFILE,
  findMisconfiguredReviewLabels,
  resolveReviewProfile,
} from "./lib/review-profile.mjs";
import {
  countPriorStaffReviews,
  filterCommentsForMode,
  formatReviewRunLog,
  getEffectiveMaxComments,
  getMaxFeedbackRounds,
  getReviewMode,
} from "./lib/rounds.mjs";
import {
  buildAddressedReplyBody,
  findCommentsToAcknowledge,
  wasLineTouched,
} from "./lib/addressed.mjs";
import { extractHunkSnippet } from "./lib/hunk.mjs";

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
  const { files } = selectReviewableFiles([
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

test("selectReviewableFiles reports skipped files in default profile", () => {
  const manyFiles = Array.from({ length: 45 }, (_, index) => ({
    filename: `src/file-${index}.ts`,
    status: "modified",
    patch: "@@ -1,1 +1,2 @@\n line\n+added",
  }));

  const { files, skipped } = selectReviewableFiles(manyFiles, DEFAULT_PROFILE);
  assert.equal(files.length, 40);
  assert.equal(skipped.length, 5);
});

test("selectReviewableFiles includes all files in thorough profile", () => {
  const manyFiles = Array.from({ length: 45 }, (_, index) => ({
    filename: `src/file-${index}.ts`,
    status: "modified",
    patch: "@@ -1,1 +1,2 @@\n line\n+added",
  }));

  const { files, skipped } = selectReviewableFiles(manyFiles, THOROUGH_PROFILE);
  assert.equal(files.length, 45);
  assert.equal(skipped.length, 0);
});

test("resolveReviewProfile selects thorough when label present", () => {
  assert.equal(resolveReviewProfile([]).name, "default");
  assert.equal(
    resolveReviewProfile([{ name: "pr-review:thorough" }]).name,
    "thorough",
  );
});

test("resolveReviewProfile falls back to default for malformed labels", () => {
  assert.equal(resolveReviewProfile(undefined).name, "default");
  assert.equal(resolveReviewProfile(null).name, "default");
  assert.equal(resolveReviewProfile({}).name, "default");
  assert.equal(resolveReviewProfile([null, {}, { name: 42 }]).name, "default");
  assert.equal(
    resolveReviewProfile([{ name: "other" }, { name: "pr-review:thorough" }])
      .name,
    "thorough",
  );
});

test("resolveReviewProfile warns on misconfigured pr-review labels", () => {
  const warnings = [];
  const originalWarn = console.warn;
  console.warn = (message) => warnings.push(String(message));

  try {
    assert.equal(
      resolveReviewProfile([{ name: "pr-review:thoroughh" }]).name,
      "default",
    );
    assert.match(warnings[0], /Unrecognised pr-review label/);
    assert.match(warnings[0], /pr-review:thoroughh/);
  } finally {
    console.warn = originalWarn;
  }
});

test("findMisconfiguredReviewLabels detects pr-review typos", () => {
  assert.deepEqual(
    findMisconfiguredReviewLabels([{ name: "pr-review:thoroughh" }]),
    ["pr-review:thoroughh"],
  );
  assert.deepEqual(findMisconfiguredReviewLabels([{ name: "pr-review:thorough" }]), []);
});

test("getMaxFeedbackRounds accepts valid integers and warns on invalid input", () => {
  assert.equal(getMaxFeedbackRounds(undefined), 2);
  assert.equal(getMaxFeedbackRounds(""), 2);
  assert.equal(getMaxFeedbackRounds("3"), 3);
  assert.equal(getMaxFeedbackRounds(5), 5);

  const warnings = [];
  const originalWarn = console.warn;
  console.warn = (message) => warnings.push(String(message));

  try {
    assert.equal(getMaxFeedbackRounds("abc"), 2);
    assert.match(warnings[0], /Invalid PR_REVIEW_MAX_FEEDBACK_ROUNDS "abc"/);
    warnings.length = 0;
    assert.equal(getMaxFeedbackRounds("2.5"), 2);
    assert.match(warnings[0], /Invalid PR_REVIEW_MAX_FEEDBACK_ROUNDS "2.5"/);
    warnings.length = 0;
    assert.equal(getMaxFeedbackRounds(0), 2);
    assert.match(warnings[0], /Invalid PR_REVIEW_MAX_FEEDBACK_ROUNDS/);
  } finally {
    console.warn = originalWarn;
  }
});

test("formatReviewRunLog includes profile and comment caps", () => {
  const log = formatReviewRunLog({
    repo: "decodedcreative/jigsaw",
    pullNumber: 51,
    provider: "openai",
    profile: THOROUGH_PROFILE,
    mode: "followup",
    roundNumber: 2,
    maxComments: Number.POSITIVE_INFINITY,
  });

  assert.match(log, /profile=thorough/);
  assert.match(log, /maxInlineComments=uncapped/);
  assert.match(log, /maxFeedbackRounds=uncapped/);
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
  const profile = { ...DEFAULT_PROFILE, maxFeedbackRounds: max };
  assert.equal(getReviewMode(0, profile), "initial");
  assert.equal(getReviewMode(1, profile), "followup");
  assert.equal(getReviewMode(2, profile), "critical");
  assert.equal(getReviewMode(5, profile), "critical");
});

test("getReviewMode keeps follow-up in thorough profile", () => {
  assert.equal(getReviewMode(0, THOROUGH_PROFILE), "initial");
  assert.equal(getReviewMode(1, THOROUGH_PROFILE), "followup");
  assert.equal(getReviewMode(5, THOROUGH_PROFILE), "followup");
  assert.equal(getReviewMode(20, THOROUGH_PROFILE), "followup");
});

test("getEffectiveMaxComments is uncapped in thorough profile", () => {
  assert.equal(getEffectiveMaxComments("initial", THOROUGH_PROFILE), Infinity);
  assert.equal(getEffectiveMaxComments("followup", DEFAULT_PROFILE), 8);
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

test("wasLineTouched detects edits near the commented line", () => {
  const patch = [
    "@@ -10,3 +10,4 @@",
    " context",
    "-old",
    "+new",
    " tail",
  ].join("\n");

  assert.equal(wasLineTouched(patch, 11), true);
  assert.equal(wasLineTouched(patch, 20), false);
});

test("findCommentsToAcknowledge replies when nearby lines changed in push diff", () => {
  const pushFiles = [
    {
      filename: "src/a.ts",
      patch: "@@ -1,2 +1,3 @@\n ctx\n-old\n+new",
    },
  ];
  const comments = [
    {
      id: 100,
      path: "src/a.ts",
      line: 2,
      user: { login: "github-actions[bot]" },
      body: "**💡 Suggestion**\n\nfix this",
    },
  ];

  const replies = findCommentsToAcknowledge(
    comments,
    pushFiles,
    "abc1234567890",
    ["fix: address review feedback"],
  );
  assert.equal(replies.length, 1);
  assert.equal(replies[0].commentId, 100);
  assert.match(replies[0].body, /Addressed in `abc1234`/);
  assert.match(replies[0].body, /fix: address review feedback/);
});

test("findCommentsToAcknowledge skips threads with human replies", () => {
  const pushFiles = [
    {
      filename: "src/a.ts",
      patch: "@@ -1,2 +1,3 @@\n ctx\n-old\n+new",
    },
  ];
  const comments = [
    {
      id: 100,
      path: "src/a.ts",
      line: 2,
      user: { login: "github-actions[bot]" },
      body: "**💡 Suggestion**\n\nfix this",
    },
    {
      id: 101,
      in_reply_to_id: 100,
      user: { login: "jameshowell" },
      body: "Fixed in abc1234",
    },
  ];

  const replies = findCommentsToAcknowledge(
    comments,
    pushFiles,
    "abc1234567890",
    ["fix: address review feedback"],
  );
  assert.equal(replies.length, 0);
});

test("findCommentsToAcknowledge ignores files outside the push diff", () => {
  const pushFiles = [
    {
      filename: "src/other.ts",
      patch: "@@ -1,1 +1,2 @@\n line\n+added",
    },
  ];
  const comments = [
    {
      id: 100,
      path: "src/a.ts",
      line: 2,
      user: { login: "github-actions[bot]" },
      body: "**💡 Suggestion**\n\nfix this",
    },
  ];

  const replies = findCommentsToAcknowledge(comments, pushFiles, "abc1234567890");
  assert.equal(replies.length, 0);
});

test("buildAddressedReplyBody includes commit messages and diff snippet", () => {
  const patch = [
    "@@ -10,3 +10,4 @@",
    " context",
    "-old",
    "+new",
    " tail",
  ].join("\n");

  const body = buildAddressedReplyBody({
    shortSha: "abc1234",
    commitMessages: ["fix: handle edge case"],
    patch,
    line: 11,
    originalFeedback: "**💡 Suggestion**\n\nUse a guard here",
  });

  assert.match(body, /Addressed in `abc1234`/);
  assert.match(body, /fix: handle edge case/);
  assert.match(body, /```diff/);
  assert.match(body, /\+new/);
});

test("extractHunkSnippet returns nearby changed lines", () => {
  const patch = [
    "@@ -10,3 +10,4 @@",
    " context",
    "-old",
    "+new",
    " tail",
  ].join("\n");

  const snippet = extractHunkSnippet(patch, 11);
  assert.ok(snippet);
  assert.match(snippet, /\+new/);
});
