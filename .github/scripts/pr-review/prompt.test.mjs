import assert from "node:assert/strict";
import test from "node:test";

import { DEFAULT_PROFILE } from "./lib/review-profile.mjs";
import { buildSystemPrompt, buildUserPrompt } from "./lib/prompt.mjs";

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

test("v4 rename-only diff is paired with do-not-comment guidance", () => {
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
    files: [
      {
        filename: "packages/design-system/src/components/button/Button.styles.ts",
        status: "modified",
        patch: `@@ -10,7 +10,7 @@ export const buttonStyles = cva(
   [
-    "focus:outline-none focus-visible:ring-2",
+    "focus:outline-hidden focus-visible:ring-2",
   ],
 );`,
      },
    ],
  });

  assert.match(systemPrompt, /outline-none.*outline-hidden/s);
  assert.match(systemPrompt, /do not comment/i);
  assert.match(userPrompt, /outline-hidden/);
  assert.match(userPrompt, /Button\.styles\.ts/);
});
