#!/usr/bin/env node
/**
 * Version publishable packages and create a git tag.
 *
 * 1. Synthesize a Changeset for packages changed since the last release baseline
 * 2. Run `changeset version` (bumps package.json + CHANGELOG.md)
 * 3. Commit and create `v{version}` from `@jigsaw-ds/design-system`
 *
 * Publishing to npm is a separate, manual step: create/publish a GitHub Release
 * for that tag (see `.github/workflows/release.yml`).
 *
 * Usage:
 *   node scripts/version-and-tag.mjs --bump patch
 *   node scripts/version-and-tag.mjs --bump minor --dry-run
 *   node scripts/version-and-tag.mjs --bump major --push
 */
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  getArg,
  hasFlag,
  main as generateChangeset,
  parseBump,
} from "./generate-changeset-from-changes.mjs";

const repoRoot = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

function log(message) {
  console.log(`version-and-tag: ${message}`);
}

function logError(message) {
  console.error(`version-and-tag: error: ${message}`);
}

function run(command, args, { stdio = "inherit" } = {}) {
  return execFileSync(command, args, {
    cwd: repoRoot,
    encoding: "utf8",
    stdio,
  });
}

function runGit(args, opts) {
  return run("git", args, opts);
}

function readDesignSystemVersion() {
  const pkg = JSON.parse(
    readFileSync(
      path.join(repoRoot, "packages/design-system/package.json"),
      "utf8"
    )
  );
  return pkg.version;
}

function assertSafeRepo({ allowDirty, allowBranch }) {
  const branch = runGit(["branch", "--show-current"], { stdio: "pipe" }).trim();
  if (branch !== "main" && !allowBranch) {
    throw new Error(
      `Expected branch main (current: ${branch || "(detached)"}). Pass --allow-branch to override.`
    );
  }

  const status = runGit(["status", "--porcelain"], { stdio: "pipe" });
  if (status.trim() && !allowDirty) {
    throw new Error(
      "Working tree is dirty. Commit/stash changes first, or pass --allow-dirty."
    );
  }
}

function main(argv = process.argv.slice(2)) {
  const bump = parseBump(getArg(argv, "--bump"));
  const dryRun = hasFlag(argv, "--dry-run");
  const push = hasFlag(argv, "--push");
  const allowDirty = hasFlag(argv, "--allow-dirty");
  const allowBranch = hasFlag(argv, "--allow-branch");

  assertSafeRepo({ allowDirty, allowBranch });

  log(`preparing ${bump} version`);

  const generateArgs = ["--bump", bump, "--force"];
  if (dryRun) generateArgs.push("--dry-run");

  const generated = generateChangeset(generateArgs);
  if (!generated || generated.skipped) {
    throw new Error(
      generated?.reason === "no-package-changes"
        ? "No publishable package changes since the last release baseline — nothing to version."
        : "Changeset generation did not produce a release candidate."
    );
  }

  if (dryRun) {
    log("dry-run complete — no version commit or tag created");
    return { dryRun: true, bump, packages: generated.packages };
  }

  const versionBefore = readDesignSystemVersion();
  log(`running changeset version (was ${versionBefore})`);
  run("npx", ["changeset", "version"]);

  const version = readDesignSystemVersion();
  const tag = `v${version}`;

  if (version === versionBefore) {
    throw new Error(
      `changeset version did not bump @jigsaw-ds/design-system (still ${versionBefore})`
    );
  }

  if (runGit(["tag", "-l", tag], { stdio: "pipe" }).trim()) {
    throw new Error(`Tag ${tag} already exists`);
  }

  log(`committing version ${version}`);
  runGit(["add", "-A", ".changeset", "packages"]);
  runGit(["commit", "-m", "chore: version packages"]);
  runGit(["tag", "-a", tag, "-m", tag]);
  log(`created tag ${tag}`);

  if (push) {
    log("pushing commit and tag");
    runGit(["push"]);
    runGit(["push", "origin", tag]);
  } else {
    log("next steps:");
    console.log(`  git push && git push origin ${tag}`);
    console.log(
      `  Create/publish a GitHub Release for ${tag} to publish to npm.`
    );
  }

  return { bump, version, tag, packages: generated.packages, pushed: push };
}

const isDirectRun =
  process.argv[1] &&
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (isDirectRun) {
  try {
    main();
  } catch (error) {
    logError(error.message);
    process.exit(1);
  }
}

export { main };
