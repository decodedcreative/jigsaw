#!/usr/bin/env node
/**
 * Generate a Changeset from publishable-package file changes since the last
 * release baseline (latest `v*` tag or `chore: version packages` commit).
 *
 * Used on `main` by the Version packages workflow so feature PRs do not need
 * hand-written `.changeset/*.md` files.
 *
 * Bump type is **explicit** (default `patch`) — not inferred from commit
 * messages — so we do not need a conventional-commit linter. Maintainers
 * choose minor/major via:
 *   npm run release:minor | release:major
 *   or the Version packages workflow_dispatch `bump` input
 *
 * Usage:
 *   node scripts/generate-changeset-from-changes.mjs
 *   node scripts/generate-changeset-from-changes.mjs --bump minor
 *   node scripts/generate-changeset-from-changes.mjs --since v0.1.0 --dry-run
 *   node scripts/generate-changeset-from-changes.mjs --force
 *
 * --force overwrites / regenerates even when pending changesets already exist
 * (used by release:* scripts and workflow_dispatch when changing bump type).
 */
import { execFileSync } from "node:child_process";
import {
  existsSync,
  mkdirSync,
  readdirSync,
  unlinkSync,
  writeFileSync,
} from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createHash } from "node:crypto";

const repoRoot = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const changesetDir = path.join(repoRoot, ".changeset");

const VALID_BUMPS = new Set(["patch", "minor", "major"]);

/**
 * Publishable package → path prefix under the monorepo.
 *
 * Order matters: longer / more specific prefixes first so
 * `packages/themes/default/` matches before a hypothetical `packages/themes/`
 * (and never falls through to a shorter sibling prefix).
 *
 * Keep this list in sync with docs/publication.md — it is the intentional
 * publish-set source of truth (not discovered dynamically).
 */
export const PACKAGE_PATHS = [
  {
    name: "@jigsaw-ds/theme-default",
    prefix: "packages/themes/default/",
  },
  {
    name: "@jigsaw-ds/theme-portfolio",
    prefix: "packages/themes/portfolio/",
  },
  {
    name: "@jigsaw-ds/design-system",
    prefix: "packages/design-system/",
  },
  {
    name: "@jigsaw-ds/theme-build",
    prefix: "packages/theme-build/",
  },
  {
    name: "@jigsaw-ds/tokens",
    prefix: "packages/tokens/",
  },
];

/** design-system + tokens always share a version (see .changeset/config.json). */
export const FIXED_GROUP = new Set([
  "@jigsaw-ds/design-system",
  "@jigsaw-ds/tokens",
]);

const IGNORE_FILE_PATTERNS = [
  /(^|\/)CHANGELOG\.md$/,
  /\.(test|stories)\.[^/]+$/,
  /(^|\/)test-setup\.[^/]+$/,
];

export function getArg(args, flag) {
  const index = args.indexOf(flag);
  return index === -1 ? undefined : args[index + 1];
}

export function hasFlag(args, flag) {
  return args.includes(flag);
}

export function parseBump(value) {
  const bump = (value ?? "patch").toLowerCase();
  if (!VALID_BUMPS.has(bump)) {
    throw new Error(
      `Invalid --bump "${value}". Expected one of: ${[...VALID_BUMPS].join(", ")}`
    );
  }
  return bump;
}

export function listPendingChangesetFiles(dir = changesetDir) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir).filter(
    (name) => name.endsWith(".md") && name !== "README.md"
  );
}

export function shouldIgnoreChangedFile(filePath) {
  return IGNORE_FILE_PATTERNS.some((pattern) => pattern.test(filePath));
}

export function packagesForChangedFiles(files) {
  const packages = new Set();
  for (const file of files) {
    if (shouldIgnoreChangedFile(file)) continue;
    for (const entry of PACKAGE_PATHS) {
      if (file === entry.prefix.slice(0, -1) || file.startsWith(entry.prefix)) {
        packages.add(entry.name);
        break;
      }
    }
  }
  return packages;
}

export function applyFixedGroup(packages) {
  const next = new Set(packages);
  for (const name of packages) {
    if (FIXED_GROUP.has(name)) {
      for (const peer of FIXED_GROUP) next.add(peer);
    }
  }
  return next;
}

export function buildChangesetMarkdown({ packages, bump, summaryLines }) {
  const frontmatter = [...packages]
    .sort()
    .map((name) => `"${name}": ${bump}`)
    .join("\n");

  const summary =
    summaryLines.length > 0
      ? summaryLines.map((line) => `- ${line}`).join("\n")
      : "- Automated changeset for publishable package updates.";

  return `---\n${frontmatter}\n---\n\n${summary}\n`;
}

export function changesetFileName(content) {
  const hash = createHash("sha1").update(content).digest("hex").slice(0, 8);
  return `auto-${hash}.md`;
}

function log(message) {
  console.log(`generate-changeset: ${message}`);
}

function logError(message) {
  console.error(`generate-changeset: error: ${message}`);
}

function runGit(args, { allowFailure = false } = {}) {
  try {
    return execFileSync("git", args, {
      cwd: repoRoot,
      encoding: "utf8",
    }).trim();
  } catch (error) {
    if (allowFailure) return "";
    throw error;
  }
}

export function resolveSinceRef(explicitSince) {
  if (explicitSince) return explicitSince;

  const tag = runGit(["describe", "--tags", "--abbrev=0", "--match", "v*"], {
    allowFailure: true,
  });
  // Prefer the latest Version packages commit when it is newer than the tag,
  // otherwise every post-version package.json bump would re-open a Version PR
  // before a GitHub Release tag exists.
  const versionCommit = runGit(
    ["log", "-1", "--format=%H", "--grep", "^chore: version packages"],
    { allowFailure: true }
  );

  if (tag && versionCommit) {
    const tagTime = Number(
      runGit(["log", "-1", "--format=%ct", tag], { allowFailure: true }) || 0
    );
    const commitTime = Number(
      runGit(["log", "-1", "--format=%ct", versionCommit], {
        allowFailure: true,
      }) || 0
    );
    return commitTime >= tagTime ? versionCommit : tag;
  }

  if (tag) return tag;
  if (versionCommit) return versionCommit;

  throw new Error(
    [
      "Cannot determine a release baseline.",
      "Expected a `v*` git tag (created when a GitHub Release is published)",
      "or a prior `chore: version packages` commit.",
      "On a brand-new repo, create and publish an initial release tag first,",
      "or pass an explicit baseline: --since <git-ref>.",
    ].join(" ")
  );
}

function changedFilesSince(sinceRef) {
  const output = runGit(["diff", "--name-only", `${sinceRef}...HEAD`]);
  return output ? output.split("\n").filter(Boolean) : [];
}

function commitsTouchingPackages(sinceRef, packageNames) {
  const prefixes = PACKAGE_PATHS.filter((entry) =>
    packageNames.has(entry.name)
  ).map((entry) => entry.prefix.replace(/\/$/, ""));

  if (prefixes.length === 0) {
    log("no package path prefixes matched the changed package set");
    return { subjects: [] };
  }

  const subjects = runGit([
    "log",
    "--format=%s",
    `${sinceRef}...HEAD`,
    "--",
    ...prefixes,
  ]);

  const list = subjects ? subjects.split("\n").filter(Boolean) : [];
  if (list.length === 0) {
    log(
      `no commits touching ${[...packageNames].join(", ")} since ${sinceRef} (summary will use a fallback line)`
    );
  }

  return { subjects: list };
}

function clearPendingChangesets() {
  for (const name of listPendingChangesetFiles()) {
    unlinkSync(path.join(changesetDir, name));
    log(`removed pending changeset ${name}`);
  }
}

export function planChangeset({ sinceRef, files, commitSubjects, bump }) {
  const packages = applyFixedGroup(packagesForChangedFiles(files));
  if (packages.size === 0) {
    return null;
  }

  const summaryLines = [];
  const seen = new Set();
  for (const subject of commitSubjects) {
    const cleaned = subject.replace(/\s*\(#\d+\)\s*$/, "").trim();
    if (!cleaned || seen.has(cleaned)) continue;
    seen.add(cleaned);
    summaryLines.push(cleaned);
    if (summaryLines.length >= 20) break;
  }

  const markdown = buildChangesetMarkdown({
    packages,
    bump,
    summaryLines,
  });

  return {
    sinceRef,
    packages: [...packages].sort(),
    bump,
    fileName: changesetFileName(markdown),
    markdown,
  };
}

function main(argv = process.argv.slice(2)) {
  const dryRun = hasFlag(argv, "--dry-run");
  const force = hasFlag(argv, "--force");
  const sinceArg = getArg(argv, "--since");
  const bump = parseBump(getArg(argv, "--bump"));

  const pending = listPendingChangesetFiles();
  if (pending.length > 0 && !force) {
    log(
      `${pending.length} pending changeset(s) already exist — skipping (pass --force to regenerate)`
    );
    for (const name of pending) console.log(`  - ${name}`);
    return { skipped: true, reason: "pending-changesets" };
  }

  if (pending.length > 0 && force && !dryRun) {
    clearPendingChangesets();
  }

  const sinceRef = resolveSinceRef(sinceArg);
  log(`baseline ${sinceRef}; bump ${bump}`);

  const files = changedFilesSince(sinceRef);
  if (files.length === 0) {
    log(`no file changes since ${sinceRef}`);
  } else {
    log(`${files.length} changed file(s) since ${sinceRef}`);
  }

  const packages = applyFixedGroup(packagesForChangedFiles(files));
  if (packages.size === 0) {
    log(
      `no publishable package paths matched those files (publish set: ${PACKAGE_PATHS.map((p) => p.name).join(", ")})`
    );
  }

  const { subjects } = commitsTouchingPackages(sinceRef, packages);
  const plan = planChangeset({
    sinceRef,
    files,
    commitSubjects: subjects,
    bump,
  });

  if (!plan) {
    log(`no publishable package changes since ${sinceRef}`);
    return { skipped: true, reason: "no-package-changes", sinceRef };
  }

  const outPath = path.join(changesetDir, plan.fileName);
  log(`${plan.bump} for ${plan.packages.join(", ")}`);
  log(`→ ${path.relative(repoRoot, outPath)}`);

  if (dryRun) {
    console.log(plan.markdown);
    return { ...plan, dryRun: true };
  }

  mkdirSync(changesetDir, { recursive: true });
  writeFileSync(outPath, plan.markdown);
  return plan;
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
