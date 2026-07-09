import assert from "node:assert/strict";
import test from "node:test";
import { buildReleaseNotes } from "./github-release-notes.mjs";

test("buildReleaseNotes uses fallback body when no changelog entries exist", () => {
  const result = buildReleaseNotes("9.9.9");
  assert.equal(result.tag, "v9.9.9");
  assert.equal(result.hasChangelogEntries, false);
  assert.match(result.body, /@jigsaw-ds\/design-system/);
});

test("buildReleaseNotes aggregates changelog sections for a version", () => {
  const result = buildReleaseNotes("0.1.0");
  assert.equal(result.hasChangelogEntries, true);
  assert.match(result.body, /### @jigsaw-ds\/design-system/);
  assert.match(result.body, /Initial public npm release/);
});
