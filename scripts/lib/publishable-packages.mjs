#!/usr/bin/env node
/**
 * Discover publishable workspace packages from Turborepo + Changesets config.
 *
 * Source of truth:
 * - `turbo ls` — workspace package names and paths
 * - each package.json `private` flag — must be publishable
 * - `.changeset/config.json` `ignore` — never version/publish
 * - `.changeset/config.json` `fixed` — packages that always share a version
 */
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const defaultRepoRoot = path.dirname(
  path.dirname(path.dirname(fileURLToPath(import.meta.url)))
);

export function parseJsonFromMixedStdout(stdout) {
  const start = stdout.indexOf("{");
  if (start === -1) {
    throw new Error(`Expected JSON in command output, got:\n${stdout.slice(0, 400)}`);
  }
  return JSON.parse(stdout.slice(start));
}

export function readChangesetConfig(repoRoot = defaultRepoRoot) {
  const filePath = path.join(repoRoot, ".changeset/config.json");
  return JSON.parse(readFileSync(filePath, "utf8"));
}

/**
 * Pure selection: turbo ls items → publishable packages.
 * Sorted longest path-prefix first for any path-based matching.
 */
export function selectPublishablePackages(
  turboItems,
  { ignore = [], isPrivate }
) {
  const ignored = new Set(ignore);
  const packages = [];

  for (const item of turboItems) {
    if (!item?.name || !item?.path) continue;
    if (ignored.has(item.name)) continue;
    if (isPrivate(item.path)) continue;

    const normalized = item.path.replace(/\\/g, "/").replace(/\/$/, "");
    packages.push({
      name: item.name,
      path: normalized,
      prefix: `${normalized}/`,
    });
  }

  return packages.sort((a, b) => b.prefix.length - a.prefix.length);
}

export function applyFixedGroups(packageNames, fixedGroups = []) {
  const next = new Set(packageNames);
  for (const group of fixedGroups) {
    const hit = group.some((name) => next.has(name));
    if (!hit) continue;
    for (const name of group) next.add(name);
  }
  return next;
}

/** Packages listed by `turbo run <task> --filter=[ref] --dry-run=json`. */
export function selectChangedPackageNames(turboDryRunPackages, publishableNames) {
  const allow = new Set(publishableNames);
  return new Set(
    (turboDryRunPackages ?? []).filter(
      (name) => name && name !== "//" && allow.has(name)
    )
  );
}

function runTurbo(args, { repoRoot, env } = {}) {
  return execFileSync("npx", ["turbo", ...args], {
    cwd: repoRoot,
    encoding: "utf8",
    env: { ...process.env, ...env },
    stdio: ["ignore", "pipe", "pipe"],
  });
}

function isPackagePrivate(repoRoot, packageRel) {
  const pkg = JSON.parse(
    readFileSync(path.join(repoRoot, packageRel, "package.json"), "utf8")
  );
  return pkg.private === true;
}

/**
 * Live discovery used by release scripts.
 */
export function loadPublishablePackages(repoRoot = defaultRepoRoot) {
  const changeset = readChangesetConfig(repoRoot);
  const ls = parseJsonFromMixedStdout(
    runTurbo(["ls", "--output=json"], { repoRoot })
  );
  const items = ls.packages?.items ?? [];
  const packages = selectPublishablePackages(items, {
    ignore: changeset.ignore ?? [],
    isPrivate: (packageRel) => isPackagePrivate(repoRoot, packageRel),
  });

  return {
    packages,
    fixedGroups: changeset.fixed ?? [],
    ignore: changeset.ignore ?? [],
  };
}

/**
 * Packages with direct changes since `sinceRef` (no dependent graph expansion).
 * Uses Turborepo: `turbo run build --filter=[sinceRef] --dry-run=json`.
 */
export function loadChangedPublishablePackages(
  sinceRef,
  repoRoot = defaultRepoRoot
) {
  const { packages, fixedGroups } = loadPublishablePackages(repoRoot);
  const publishableNames = packages.map((pkg) => pkg.name);
  const dry = parseJsonFromMixedStdout(
    runTurbo(
      ["run", "build", `--filter=[${sinceRef}]`, "--dry-run=json"],
      { repoRoot }
    )
  );
  const changed = selectChangedPackageNames(dry.packages, publishableNames);
  const withFixed = applyFixedGroups(changed, fixedGroups);
  return {
    packages,
    fixedGroups,
    changedNames: withFixed,
    changedPackages: packages.filter((pkg) => withFixed.has(pkg.name)),
  };
}

export function publishablePackagePaths(repoRoot = defaultRepoRoot) {
  return loadPublishablePackages(repoRoot).packages.map((pkg) => pkg.path);
}
