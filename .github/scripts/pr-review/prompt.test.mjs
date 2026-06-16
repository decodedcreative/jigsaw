import assert from "node:assert/strict";
import test from "node:test";

import { DEFAULT_PROFILE } from "./lib/review-profile.mjs";
import { buildSystemPrompt, buildUserPrompt } from "./lib/prompt.mjs";

/** @param {{ filename: string, patch: string, v4Token: string | RegExp }} input */
function assertV4RenameDiffHasGuidance({ filename, patch, v4Token }) {
  const profile = DEFAULT_PROFILE;
  const systemPrompt = buildSystemPrompt("critical", profile);
  const userPrompt = buildUserPrompt({
    title: "feat: Tailwind v4 class renames",
    body: "Automated @tailwindcss/upgrade output",
    author: "dev",
    base: "main",
    head: "feat/tailwind-v4",
    mode: "critical",
    roundNumber: 3,
    profile,
    files: [{ filename, status: "modified", patch }],
  });

  assert.match(systemPrompt, /do not comment/i);
  assert.ok(userPrompt.includes(filename), `expected user prompt to include ${filename}`);
  if (v4Token instanceof RegExp) {
    assert.match(userPrompt, v4Token);
  } else {
    assert.ok(userPrompt.includes(v4Token), `expected user prompt to include ${v4Token}`);
  }
}

test("buildSystemPrompt includes Tailwind v4 migration guidance", () => {
  const prompt = buildSystemPrompt("initial", DEFAULT_PROFILE);

  assert.match(prompt, /Tailwind CSS v4/);
  assert.match(prompt, /outline-hidden/);
  assert.match(prompt, /bg-linear-to-/);
  assert.match(prompt, /do not suggest reverting to v3/i);
});

test("buildSystemPrompt reminds critical mode not to flag v4 renames", () => {
  const prompt = buildSystemPrompt("critical", DEFAULT_PROFILE);

  assert.match(prompt, /Do \*\*not\*\* flag Tailwind v4 canonical renames/);
  assert.match(prompt, /outline-hidden/);
});

test("buildSystemPrompt includes v4 guidance in thorough mode", () => {
  const prompt = buildSystemPrompt("followup", {
    ...DEFAULT_PROFILE,
    name: "thorough",
    keepFullFeedbackRounds: true,
  });

  assert.match(prompt, /Thorough review mode/);
  assert.match(prompt, /bg-linear-to-/);
});

const isolatedV4Renames = [
  {
    name: "outline-none → outline-hidden",
    filename: "packages/design-system/src/components/button/Button.styles.ts",
    patch: `@@ -10,7 +10,7 @@
-    "focus:outline-none focus-visible:ring-2",
+    "focus:outline-hidden focus-visible:ring-2",`,
    v4Token: "outline-hidden",
  },
  {
    name: "bg-gradient-to-r → bg-linear-to-r",
    filename: "apps/storybook/stories/examples/Hero.stories.tsx",
    patch: `@@ -4,7 +4,7 @@
-      <div className="bg-gradient-to-r from-brand-primary to-brand-accent">
+      <div className="bg-linear-to-r from-brand-primary to-brand-accent">`,
    v4Token: "bg-linear-to-r",
  },
  {
    name: "shadow-sm → shadow-xs",
    filename: "packages/design-system/src/components/card/Card.styles.ts",
    patch: `@@ -2,7 +2,7 @@
-  "rounded-lg shadow-sm border",
+  "rounded-lg shadow-xs border",`,
    v4Token: "shadow-xs",
  },
  {
    name: "flex-shrink-0 → shrink-0",
    filename: "packages/design-system/src/components/avatar/Avatar.styles.ts",
    patch: `@@ -1,7 +1,7 @@
-  "inline-flex flex-shrink-0",
+  "inline-flex shrink-0",`,
    v4Token: "shrink-0",
  },
  {
    name: "data-[disabled]: → data-disabled:",
    filename: "packages/design-system/src/components/input/Input.styles.ts",
    patch: `@@ -5,7 +5,7 @@
-    "data-[disabled]:opacity-50",
+    "data-disabled:opacity-50",`,
    v4Token: "data-disabled:",
  },
];

for (const rename of isolatedV4Renames) {
  test(`isolated v4 rename: ${rename.name}`, () => {
    assertV4RenameDiffHasGuidance(rename);
  });
}

test("combined v4 renames in one hunk are covered by do-not-comment guidance", () => {
  assertV4RenameDiffHasGuidance({
    filename: "packages/design-system/src/components/modal/Modal.styles.ts",
    patch: `@@ -1,9 +1,9 @@
 export const modalStyles = cva([
-  "shadow-sm backdrop-blur-sm flex-shrink-0 focus:outline-none",
-  "data-[disabled]:cursor-not-allowed bg-gradient-to-b from-surface-primary",
+  "shadow-xs backdrop-blur-xs shrink-0 focus:outline-hidden",
+  "data-disabled:cursor-not-allowed bg-linear-to-b from-surface-primary",
 ]);`,
    v4Token: /shadow-xs|backdrop-blur-xs|shrink-0|outline-hidden|data-disabled:|bg-linear-to-b/,
  });

  const systemPrompt = buildSystemPrompt("critical", DEFAULT_PROFILE);
  assert.match(systemPrompt, /shadow-sm.*shadow-xs/s);
  assert.match(systemPrompt, /flex-shrink-0.*shrink-0/s);
  assert.match(systemPrompt, /data-\[disabled\]:.*data-disabled:/s);
});
