#!/usr/bin/env node
/**
 * Verify publishable @jigsaw-ds/* packages are ready for npm:
 * - LICENSE matches repo root (identical MIT text in every tarball)
 * - Every export / main / module / types target exists on disk
 * - npm pack --dry-run includes export targets and no known stale paths
 *
 * For publint/attw validation (including ignored findings), see
 * scripts/validate-publishable-packages.mjs.
 */
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

const PUBLISHABLE_PACKAGES = [
  "packages/design-system",
  "packages/tokens",
  "packages/theme-build",
  "packages/themes/default",
  "packages/themes/portfolio",
];

/** Paths that must never appear in a published tarball. */
const STALE_PATH_DENYLIST = [/dist\/css\/themes\//];

const errors = [];

function fail(message) {
  errors.push(message);
}

function collectFilePaths(value, paths = new Set()) {
  if (typeof value === "string" && value.startsWith("./")) {
    paths.add(value);
  } else if (value && typeof value === "object") {
    for (const entry of Object.values(value)) {
      collectFilePaths(entry, paths);
    }
  }
  return paths;
}

function assertPathExists(packageRel, relativePath) {
  const packageDir = path.join(repoRoot, packageRel);

  if (relativePath.includes("*")) {
    const dir = relativePath.replace(/\/\*.*$/, "").replace(/^\.\//, "");
    const full = path.join(packageDir, dir);
    if (!existsSync(full)) {
      fail(`${packageRel}: export glob directory missing: ${relativePath}`);
      return;
    }
    if (readdirSync(full).length === 0) {
      fail(`${packageRel}: export glob directory empty: ${relativePath}`);
    }
    return;
  }

  const full = path.join(packageDir, relativePath.replace(/^\.\//, ""));
  if (!existsSync(full)) {
    fail(`${packageRel}: export target missing: ${relativePath}`);
  }
}

function verifyLicenseConsistency() {
  const rootLicensePath = path.join(repoRoot, "LICENSE");
  if (!existsSync(rootLicensePath)) {
    fail("repo root: missing LICENSE");
    return;
  }

  const rootLicense = readFileSync(rootLicensePath, "utf8");
  for (const packageRel of PUBLISHABLE_PACKAGES) {
    const licensePath = path.join(repoRoot, packageRel, "LICENSE");
    if (!existsSync(licensePath)) {
      fail(`${packageRel}: missing LICENSE`);
      continue;
    }
    const content = readFileSync(licensePath, "utf8");
    if (content !== rootLicense) {
      fail(
        `${packageRel}: LICENSE differs from repo root — all packages share identical MIT text`,
      );
    }
  }
}

function parsePackFiles(packageRel) {
  const output = execFileSync("npm", ["pack", "--dry-run", "--json"], {
    cwd: path.join(repoRoot, packageRel),
    encoding: "utf8",
  });
  const parsed = JSON.parse(output);
  const entry = Array.isArray(parsed) ? parsed[0] : parsed;
  return new Set(entry.files.map((file) => file.path));
}

function verifyPackage(packageRel) {
  const packageDir = path.join(repoRoot, packageRel);
  const pkg = JSON.parse(readFileSync(path.join(packageDir, "package.json"), "utf8"));

  if (pkg.private) {
    fail(`${packageRel}: still marked private`);
  }

  for (const field of ["README.md", "LICENSE"]) {
    if (!existsSync(path.join(packageDir, field))) {
      fail(`${packageRel}: missing ${field}`);
    }
  }

  for (const field of ["dependencies", "peerDependencies", "optionalDependencies"]) {
    const deps = pkg[field];
    if (!deps) continue;
    for (const [name, range] of Object.entries(deps)) {
      if (range === "*") {
        fail(
          `${packageRel}: ${field}["${name}"] is "*" — published packages need a semver range`,
        );
      }
    }
  }

  const exportPaths = collectFilePaths(pkg.exports ?? {});
  for (const field of ["main", "module", "types"]) {
    if (pkg[field]) {
      exportPaths.add(pkg[field]);
    }
  }

  for (const exportPath of exportPaths) {
    assertPathExists(packageRel, exportPath);
  }

  const packed = parsePackFiles(packageRel);

  for (const exportPath of exportPaths) {
    if (exportPath.includes("*")) {
      const prefix = exportPath.replace(/\/\*.*$/, "").replace(/^\.\//, "");
      const hasMatch = [...packed].some((file) => file.startsWith(`${prefix}/`) || file === prefix);
      if (!hasMatch) {
        fail(
          `${packageRel}: export glob ${exportPath} has no matching files in npm pack output`,
        );
      }
      continue;
    }
    const normalized = exportPath.replace(/^\.\//, "");
    if (!packed.has(normalized)) {
      fail(`${packageRel}: export ${exportPath} missing from npm pack output`);
    }
  }

  for (const packedFile of packed) {
    for (const pattern of STALE_PATH_DENYLIST) {
      if (pattern.test(packedFile)) {
        fail(`${packageRel}: stale file in tarball: ${packedFile}`);
      }
    }
  }
}

verifyLicenseConsistency();
for (const packageRel of PUBLISHABLE_PACKAGES) {
  verifyPackage(packageRel);
}

if (errors.length > 0) {
  console.error("verify-publishable-packages failed:\n");
  for (const message of errors) {
    console.error(`  - ${message}`);
  }
  process.exit(1);
}

console.log(
  `verify-publishable-packages: ${PUBLISHABLE_PACKAGES.length} packages OK`,
);
