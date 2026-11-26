#!/usr/bin/env node
/**
 * PR check: a pull request that changes a publishable package must fill in the
 * `## Consumer changelog` section of its description, with a sentence per
 * change for app developers or an explicit "None." (JSW-137).
 *
 * Runs in .github/workflows/consumer-changelog.yml, which re-runs when the PR
 * description is edited. Reads the PR from the GitHub event payload:
 *
 *   GITHUB_EVENT_PATH=event.json node scripts/check-consumer-changelog.mjs
 */
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  checkPullRequestBody,
  extractConsumerChangelog,
} from "./lib/consumer-changelog.mjs";
import {
  loadPublishablePackages,
  selectPackagesTouchedInGit,
} from "./lib/publishable-packages.mjs";

const repoRoot = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

function main() {
  const eventPath = process.env.GITHUB_EVENT_PATH;
  if (!eventPath)
    throw new Error(
      "GITHUB_EVENT_PATH is not set; run this from a pull_request workflow.",
    );
  const pr = JSON.parse(readFileSync(eventPath, "utf8")).pull_request;
  if (!pr) throw new Error("The event payload has no pull_request.");

  const diff = execFileSync(
    "git",
    ["diff", "--name-only", `${pr.base.sha}...${pr.head.sha}`],
    {
      cwd: repoRoot,
      encoding: "utf8",
    },
  ).trim();
  const changedFiles = diff ? diff.split("\n") : [];
  const { packages } = loadPublishablePackages(repoRoot);
  const touched = selectPackagesTouchedInGit(changedFiles, packages);

  const result = checkPullRequestBody({
    body: pr.body ?? "",
    touchesPublishablePackage: touched.size > 0,
  });
  if (touched.size > 0)
    console.log(
      `consumer-changelog: publishable packages changed: ${[...touched].sort().join(", ")}`,
    );

  if (!result.ok) {
    console.log(`::error title=Consumer changelog missing::${result.reason}`);
    process.exit(1);
  }

  const { entries } = extractConsumerChangelog(pr.body ?? "");
  console.log(`consumer-changelog: OK (${result.reason})`);
  for (const entry of entries) console.log(`  - ${entry}`);
}

try {
  main();
} catch (error) {
  console.error(`consumer-changelog: error: ${error.message}`);
  process.exit(1);
}
