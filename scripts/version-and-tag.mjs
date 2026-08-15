#!/usr/bin/env node
/**
 * Version publishable packages and open a version PR.
 *
 * 1. Synthesize a Changeset for packages with direct file changes since the last release baseline
 * 2. Run `changeset version` (bumps package.json + CHANGELOG.md)
 * 3. Create branch `chore/version-{version}`, commit, push, and open a PR to main
 *
 * Do not create git tags here — squash-merge rewrites SHAs. After the PR merges,
 * `.github/workflows/tag-version.yml` creates annotated tag `v{version}`, then
 * `draft-github-release.yml` opens a draft Release. Publishing that release
 * runs `release.yml` → npm.
 *
 * By default the version branch is pushed and a PR is opened. Pass `--no-push`
 * to leave the branch local (e.g. to inspect before pushing).
 *
 * Usage:
 *   node scripts/version-and-tag.mjs --bump patch
 *   node scripts/version-and-tag.mjs --bump minor --dry-run
 *   node scripts/version-and-tag.mjs --bump major --no-push
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

function assertTagAvailable(tag) {
  if (runGit(["tag", "-l", tag], { stdio: "pipe" }).trim()) {
    throw new Error(`Tag ${tag} already exists locally`);
  }

  const remote = runGit(["ls-remote", "--tags", "origin", tag], {
    stdio: "pipe",
  }).trim();
  if (remote) {
    throw new Error(`Tag ${tag} already exists on origin`);
  }
}

function prBody(version, tag) {
  return [
    `Bumps publishable packages to **${version}**.`,
    "",
    "After this PR merges to `main`:",
    `- CI creates annotated tag \`${tag}\` (if missing) from \`@jigsaw-ds/design-system\``,
    "- A draft GitHub Release opens for that tag",
    "- Publishing the release runs npm publish",
    "",
    "Do not create the tag manually — squash merge changes commit SHAs.",
  ].join("\n");
}

function classifyGhPrCreateFailure(error) {
  const detail = [error?.message, error?.stderr, error?.stdout]
    .filter(Boolean)
    .join("\n");

  if (/auth|login|HTTP 401|HTTP 403|GH_TOKEN|not logged/i.test(detail)) {
    return "authentication/authorization";
  }
  if (
    /network|ECONNREFUSED|ENOTFOUND|ETIMEDOUT|Could not resolve|getaddrinfo/i.test(
      detail
    )
  ) {
    return "network";
  }
  return "generic";
}

function createPullRequest(version, tag, branch) {
  const title = `chore: version packages (v${version})`;
  try {
    const url = run(
      "gh",
      [
        "pr",
        "create",
        "--base",
        "main",
        "--head",
        branch,
        "--title",
        title,
        "--body",
        prBody(version, tag),
      ],
      { stdio: "pipe" }
    ).trim();
    log(`opened PR: ${url}`);
    return url;
  } catch (error) {
    const kind = classifyGhPrCreateFailure(error);
    logError(
      `failed to open PR with gh (${kind} failure: ${error.message}). Branch ${branch} was pushed.`
    );
    console.log("Create the PR manually:");
    console.log(
      `  gh pr create --base main --head ${branch} --title ${JSON.stringify(title)} --body ${JSON.stringify(prBody(version, tag))}`
    );
    return null;
  }
}

function main(argv = process.argv.slice(2)) {
  const bump = parseBump(getArg(argv, "--bump"));
  const dryRun = hasFlag(argv, "--dry-run");
  const push = !hasFlag(argv, "--no-push");
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
    log("dry-run complete — no version commit or PR created");
    return { dryRun: true, bump, packages: generated.packages };
  }

  const versionBefore = readDesignSystemVersion();
  log(`running changeset version (was ${versionBefore})`);
  run("npx", ["changeset", "version"]);

  const version = readDesignSystemVersion();
  const tag = `v${version}`;
  const branch = `chore/version-${version}`;

  if (version === versionBefore) {
    throw new Error(
      `changeset version did not bump @jigsaw-ds/design-system (still ${versionBefore})`
    );
  }

  assertTagAvailable(tag);

  log(`creating branch ${branch}`);
  runGit(["checkout", "-b", branch]);

  log(`committing version ${version}`);
  runGit(["add", "-A", ".changeset", "packages"]);
  runGit(["commit", "-m", "chore: version packages"]);

  let prUrl = null;
  if (push) {
    log(`pushing ${branch}`);
    runGit(["push", "-u", "origin", "HEAD"]);
    prUrl = createPullRequest(version, tag, branch);
  } else {
    log("skipped push (--no-push); next steps:");
    console.log(`  git push -u origin ${branch}`);
    console.log(
      `  gh pr create --base main --head ${branch} --title ${JSON.stringify(`chore: version packages (v${version})`)} --body ${JSON.stringify(prBody(version, tag))}`
    );
  }

  log("returning to main (pre-version tip)");
  runGit(["checkout", "main"]);

  log("next steps:");
  console.log(
    prUrl
      ? `  Merge ${prUrl}`
      : `  Merge the version PR for ${tag} once opened`
  );
  console.log(
    `  After merge, CI tags ${tag} and opens a draft GitHub Release; publish that release to npm.`
  );

  return {
    bump,
    version,
    tag,
    branch,
    packages: generated.packages,
    pushed: push,
    prUrl,
  };
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
