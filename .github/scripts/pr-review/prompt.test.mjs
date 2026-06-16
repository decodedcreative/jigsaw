import assert from "node:assert/strict";
import test from "node:test";

import { DEFAULT_PROFILE } from "./lib/review-profile.mjs";
import { buildSystemPrompt } from "./lib/prompt.mjs";

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
