#!/usr/bin/env node
/**
 * Generate a Changeset from publishable-package changes since the last
 * release baseline (latest `v*` tag or `chore: version packages` commit).
 *
 * Packages are discovered via Turborepo (`turbo ls`) + `.changeset/config.json`
 * (ignore / fixed groups). Changed packages use
 * `turbo run build --filter=[since] --dry-run=json` (direct changes only).
 *
 * Prefer the maintainer entrypoint `npm run version-and-tag:*`, which calls this
 * script then runs `changeset version` and creates a git tag.
 *
 * Usage:
 *   node scripts/generate-changeset-from-changes.mjs
 *   node scripts/generate-changeset-from-changes.mjs --bump minor
 *   node scripts/generate-changeset-from-changes.mjs --since v0.1.0 --dry-run
 *   node scripts/generate-changeset-from-changes.mjs --force
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
import {
  loadChangedPublishablePackages,
} from "./lib/publishable-packages.mjs";

const repoRoot = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const changesetDir = path.join(repoRoot, ".changeset");

const VALID_BUMPS = new Set(["patch", "minor", "major"]);

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

export function missingBaselineError() {
  return new Error(
    [
      "Cannot determine a release baseline.",
      "Expected a `v*` git tag (from the release tag workflow)",
      "or a prior `chore: version packages` commit.",
      "Bootstrap with `--since <git-ref>` (e.g. the initial commit),",
      "or create an initial `v*` tag after the first version commit.",
    ].join(" ")
  );
}

/**
 * Pick the release baseline from tag / version-commit candidates.
 * Prefer the newer of the two when both exist so a local version commit
 * that is ahead of the last published tag does not re-include already-versioned diffs.
 */
export function chooseSinceRef({ tag, versionCommit, tagTime = 0, commitTime = 0 }) {
  if (tag && versionCommit) {
    return commitTime >= tagTime ? versionCommit : tag;
  }
  if (tag) return tag;
  if (versionCommit) return versionCommit;
  throw missingBaselineError();
}

export function resolveSinceRef(explicitSince) {
  if (explicitSince) return explicitSince;

  const tag = runGit(["describe", "--tags", "--abbrev=0", "--match", "v*"], {
    allowFailure: true,
  });
  const versionCommit = runGit(
    ["log", "-1", "--format=%H", "--grep", "^chore: version packages"],
    { allowFailure: true }
  );

  const tagTime = tag
    ? Number(runGit(["log", "-1", "--format=%ct", tag], { allowFailure: true }) || 0)
    : 0;
  const commitTime = versionCommit
    ? Number(
        runGit(["log", "-1", "--format=%ct", versionCommit], {
          allowFailure: true,
        }) || 0
      )
    : 0;

  return chooseSinceRef({ tag, versionCommit, tagTime, commitTime });
}

function commitSubjectsForPackages(sinceRef, packagePaths) {
  if (packagePaths.length === 0) {
    log("no package paths available for commit summary");
    return [];
  }

  const subjects = runGit([
    "log",
    "--format=%s",
    `${sinceRef}...HEAD`,
    "--",
    ...packagePaths,
  ]);
  const list = subjects ? subjects.split("\n").filter(Boolean) : [];
  if (list.length === 0) {
    log(
      `no commits under ${packagePaths.join(", ")} since ${sinceRef} (summary will use a fallback line)`
    );
  }
  return list;
}

function clearPendingChangesets() {
  for (const name of listPendingChangesetFiles()) {
    unlinkSync(path.join(changesetDir, name));
    log(`removed pending changeset ${name}`);
  }
}

export function planChangeset({ packageNames, bump, commitSubjects, sinceRef }) {
  if (packageNames.size === 0) return null;

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
    packages: packageNames,
    bump,
    summaryLines,
  });

  return {
    sinceRef,
    packages: [...packageNames].sort(),
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

  const { packages: publishable, changedNames, changedPackages } =
    loadChangedPublishablePackages(sinceRef, repoRoot);
  log(
    `publishable packages (${publishable.length}): ${publishable.map((pkg) => pkg.name).join(", ")}`
  );

  if (changedNames.size === 0) {
    log(`no publishable package changes since ${sinceRef} (via turbo)`);
    return { skipped: true, reason: "no-package-changes", sinceRef };
  }

  log(`changed: ${[...changedNames].sort().join(", ")}`);

  const subjects = commitSubjectsForPackages(
    sinceRef,
    changedPackages.map((pkg) => pkg.path)
  );
  const plan = planChangeset({
    sinceRef,
    packageNames: changedNames,
    bump,
    commitSubjects: subjects,
  });

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
