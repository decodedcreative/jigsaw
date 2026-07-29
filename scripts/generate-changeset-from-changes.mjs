#!/usr/bin/env node
/**
 * Generate a Changeset from publishable-package file changes since the last
 * release tag (or an explicit --since ref).
 *
 * Used on `main` by the Version packages workflow so feature PRs do not need
 * hand-written `.changeset/*.md` files.
 *
 * Bump type is inferred from conventional commit subjects in the range:
 *   major  — `type!:` or body/footer containing BREAKING CHANGE
 *   minor  — `feat`
 *   patch  — everything else (fix, perf, refactor, chore, …)
 *
 * Usage:
 *   node scripts/generate-changeset-from-changes.mjs
 *   node scripts/generate-changeset-from-changes.mjs --since v0.1.0
 *   node scripts/generate-changeset-from-changes.mjs --dry-run
 *   node scripts/generate-changeset-from-changes.mjs --force
 */
import { execFileSync } from "node:child_process";
import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  writeFileSync,
} from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createHash } from "node:crypto";

const repoRoot = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const changesetDir = path.join(repoRoot, ".changeset");

/** Longest path prefix first so themes/default wins over packages/. */
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

const BUMP_RANK = { patch: 1, minor: 2, major: 3 };

export function getArg(args, flag) {
  const index = args.indexOf(flag);
  return index === -1 ? undefined : args[index + 1];
}

export function hasFlag(args, flag) {
  return args.includes(flag);
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

/**
 * Infer the highest bump from conventional-commit subjects (and optional
 * full messages when checking for BREAKING CHANGE).
 */
export function inferBumpType(commitSubjects, commitBodies = []) {
  let bump = "patch";
  for (const subject of commitSubjects) {
    const trimmed = subject.trim();
    if (/^(\w+)(\([^)]*\))?!:/.test(trimmed)) {
      bump = "major";
      break;
    }
    if (/^feat(\([^)]*\))?:/.test(trimmed)) {
      if (BUMP_RANK.minor > BUMP_RANK[bump]) bump = "minor";
    }
  }
  for (const body of commitBodies) {
    if (/BREAKING CHANGE/i.test(body)) {
      return "major";
    }
  }
  return bump;
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
    "No --since ref, no v* tag, and no 'chore: version packages' commit found. Pass --since <ref>."
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

  if (prefixes.length === 0) return { subjects: [], bodies: [] };

  const subjects = runGit([
    "log",
    "--format=%s",
    `${sinceRef}...HEAD`,
    "--",
    ...prefixes,
  ]);
  const bodies = runGit([
    "log",
    "--format=%B",
    `${sinceRef}...HEAD`,
    "--",
    ...prefixes,
  ]);

  return {
    subjects: subjects ? subjects.split("\n").filter(Boolean) : [],
    bodies: bodies ? [bodies] : [],
  };
}

export function planChangeset({
  sinceRef,
  files,
  commitSubjects,
  commitBodies,
}) {
  const packages = applyFixedGroup(packagesForChangedFiles(files));
  if (packages.size === 0) {
    return null;
  }

  const bump = inferBumpType(commitSubjects, commitBodies);
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

  const pending = listPendingChangesetFiles();
  if (pending.length > 0 && !force) {
    console.log(
      `generate-changeset: ${pending.length} pending changeset(s) already exist — skipping`
    );
    for (const name of pending) console.log(`  - ${name}`);
    return { skipped: true, reason: "pending-changesets" };
  }

  const sinceRef = resolveSinceRef(sinceArg);
  const files = changedFilesSince(sinceRef);
  const packages = applyFixedGroup(packagesForChangedFiles(files));
  const { subjects, bodies } = commitsTouchingPackages(sinceRef, packages);
  const plan = planChangeset({
    sinceRef,
    files,
    commitSubjects: subjects,
    commitBodies: bodies,
  });

  if (!plan) {
    console.log(
      `generate-changeset: no publishable package changes since ${sinceRef}`
    );
    return { skipped: true, reason: "no-package-changes", sinceRef };
  }

  const outPath = path.join(changesetDir, plan.fileName);
  console.log(
    `generate-changeset: ${plan.bump} for ${plan.packages.join(", ")} since ${sinceRef}`
  );
  console.log(`  → ${path.relative(repoRoot, outPath)}`);

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
    console.error(`generate-changeset: ${error.message}`);
    process.exit(1);
  }
}

export { main };
