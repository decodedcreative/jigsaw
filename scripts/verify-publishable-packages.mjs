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
import { publishablePackagePaths } from "./lib/publishable-packages.mjs";

const repoRoot = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

const PUBLISHABLE_PACKAGES = publishablePackagePaths(repoRoot);

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

function hasUseClientDirective(source) {
  return source.includes('"use client"') || source.includes("'use client'");
}

/**
 * After the presentational RSC migration, the design-system package must not
 * force a blanket client boundary on the entry. Leaf modules that need client
 * APIs keep their own `"use client"` directive.
 */
function verifyDesignSystemClientBoundaries() {
  const packageRel = "packages/design-system";
  const dist = path.join(repoRoot, packageRel, "dist");
  const packageJson = JSON.parse(
    readFileSync(path.join(repoRoot, packageRel, "package.json"), "utf8"),
  );

  const mustStayServer = [
    "index.mjs",
    "theme/config.mjs",
    "theme/index.mjs",
    "utils/getClassNames.mjs",
    "utils/index.mjs",
    "components/badge/Badge.mjs",
    "components/badge/index.mjs",
    "components/text/Text.mjs",
    "components/heading/Heading.mjs",
    "components/card/Card.mjs",
    "components/icon/Icon.mjs",
    "components/skeleton/Skeleton.mjs",
  ];

  const mustStayClient = [
    "components/button/Button.mjs",
    "components/avatar/Avatar.mjs",
    "hooks/useGetClassNames.mjs",
    "providers/theme/ThemeProvider.mjs",
  ];

  for (const rel of mustStayServer) {
    const full = path.join(dist, rel);
    if (!existsSync(full)) {
      fail(`${packageRel}: missing built module ${rel}`);
      continue;
    }
    if (hasUseClientDirective(readFileSync(full, "utf8"))) {
      fail(
        `${packageRel}: ${rel} must not include "use client" (RSC-safe entry/module)`,
      );
    }
  }

  for (const rel of mustStayClient) {
    const full = path.join(dist, rel);
    if (!existsSync(full)) {
      fail(`${packageRel}: missing built module ${rel}`);
      continue;
    }
    const source = readFileSync(full, "utf8");
    if (!hasUseClientDirective(source)) {
      fail(`${packageRel}: ${rel} must include "use client"`);
    }
  }

  const buttonCjs = path.join(dist, "components/button/Button.js");
  if (existsSync(buttonCjs)) {
    const source = readFileSync(buttonCjs, "utf8");
    if (!source.startsWith('"use client";\n"use strict";')) {
      fail(
        `${packageRel}: components/button/Button.js must start with "use client" before "use strict"`,
      );
    }
  }

  // Every public subpath export (except CSS) must resolve to built files.
  for (const [exportPath, target] of Object.entries(packageJson.exports ?? {})) {
    if (exportPath === "./tailwind.css") continue;
    if (!target || typeof target !== "object") continue;
    const importDefault = target.import?.default;
    const importTypes = target.import?.types;
    const requireDefault = target.require?.default;
    const requireTypes = target.require?.types;
    for (const fileRel of [
      importDefault,
      importTypes,
      requireDefault,
      requireTypes,
    ]) {
      if (typeof fileRel !== "string") continue;
      const full = path.join(repoRoot, packageRel, fileRel);
      if (!existsSync(full)) {
        fail(`${packageRel}: export ${exportPath} missing file ${fileRel}`);
      }
    }
  }
}

verifyLicenseConsistency();
for (const packageRel of PUBLISHABLE_PACKAGES) {
  verifyPackage(packageRel);
}
verifyDesignSystemClientBoundaries();

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
