import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { isJsonChange, watchBuild } from "../src/watch-build.mjs";

const silent = { log() {}, error() {} };

test("isJsonChange accepts json files and unknown watch events", () => {
  assert.equal(isJsonChange("colors-light.json"), true);
  assert.equal(isJsonChange("semantic/colors-light.json"), true);
  assert.equal(isJsonChange(null), true);
  assert.equal(isJsonChange("notes.md"), false);
});

test("watchBuild coalesces rapid json saves and queues one follow-up", async () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "jigsaw-watch-"));
  let runs = 0;
  /** @type {() => void} */
  let release = () => {};
  let gate = new Promise((resolve) => {
    release = resolve;
  });

  const { schedule, stop } = watchBuild({
    dirs: [dir],
    label: "test",
    debounceMs: 20,
    ...silent,
    run: async () => {
      runs += 1;
      await gate;
    },
  });

  schedule("a.json");
  schedule("b.json");
  await new Promise((resolve) => setTimeout(resolve, 50));
  assert.equal(runs, 1);

  schedule("c.json");
  await new Promise((resolve) => setTimeout(resolve, 40));
  release();
  await new Promise((resolve) => setTimeout(resolve, 40));
  assert.equal(runs, 2);

  stop();
  fs.rmSync(dir, { recursive: true, force: true });
});

test("watchBuild ignores non-json files", async () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "jigsaw-watch-"));
  let runs = 0;
  const { schedule, stop } = watchBuild({
    dirs: [dir],
    label: "test",
    debounceMs: 10,
    ...silent,
    run: async () => {
      runs += 1;
    },
  });

  schedule("notes.md");
  await new Promise((resolve) => setTimeout(resolve, 40));
  assert.equal(runs, 0);

  stop();
  fs.rmSync(dir, { recursive: true, force: true });
});
