#!/usr/bin/env node
/**
 * Pre-publish validation: publint + attw on TypeScript packages.
 * Run after `npm run verify:packages` (build + tarball integrity).
 */
import { execFileSync } from "node:child_process";
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

/** attw on packages with TypeScript exports. CSS-only subpaths are excluded. */
const ATTW_CHECKS = [
  {
    packageRel: "packages/design-system",
    excludeEntrypoints: ["./tailwind.css"],
  },
  {
    packageRel: "packages/tokens",
    excludeEntrypoints: ["./shared/*", "./tailwind-theme.css", "./docs-tokens"],
  },
];

function run(command, args) {
  execFileSync(command, args, { cwd: repoRoot, stdio: "inherit" });
}

for (const packageRel of PUBLISHABLE_PACKAGES) {
  console.log(`\npublint: ${packageRel}`);
  run("npx", ["publint", packageRel]);
}

for (const { packageRel, excludeEntrypoints } of ATTW_CHECKS) {
  console.log(`\nattw: ${packageRel}`);
  run("npx", [
    "attw",
    "--pack",
    packageRel,
    "--profile",
    "node16",
    "--exclude-entrypoints",
    ...excludeEntrypoints,
  ]);
}

console.log(
  `\nvalidate-publishable-packages: ${PUBLISHABLE_PACKAGES.length} publint + ${ATTW_CHECKS.length} attw OK`,
);
