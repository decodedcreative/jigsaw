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

/**
 * Expected attw findings we intentionally accept. Document the reason when adding
 * a rule — see `attw --help` for rule names.
 */
const ATTW_IGNORE_RULES = [];

/** When true, publint warnings fail the build (enable once the tree is warning-free). */
const PUBLINT_STRICT = false;

function runStep(label, command, args) {
  const cmdLine = [command, ...args].join(" ");
  try {
    execFileSync(command, args, { cwd: repoRoot, stdio: "inherit" });
  } catch (error) {
    console.error(`\nvalidate-publishable-packages: ${label} failed`);
    console.error(`  command: ${cmdLine}`);
    if (error && typeof error.status === "number" && error.status !== 0) {
      process.exit(error.status);
    }
    if (error && error.message) {
      console.error(`  error: ${error.message}`);
    }
    process.exit(1);
  }
}

for (const packageRel of PUBLISHABLE_PACKAGES) {
  console.log(`\npublint: ${packageRel}`);
  const publintArgs = ["publint", packageRel];
  if (PUBLINT_STRICT) {
    publintArgs.push("--strict");
  }
  runStep(`publint ${packageRel}`, "npx", publintArgs);
}

for (const { packageRel, excludeEntrypoints } of ATTW_CHECKS) {
  console.log(`\nattw: ${packageRel}`);
  const attwArgs = [
    "attw",
    "--pack",
    packageRel,
    "--profile",
    "node16",
    "--exclude-entrypoints",
    ...excludeEntrypoints,
  ];
  if (ATTW_IGNORE_RULES.length > 0) {
    attwArgs.push("--ignore-rules", ...ATTW_IGNORE_RULES);
  }
  runStep(`attw ${packageRel}`, "npx", attwArgs);
}

console.log(
  `\nvalidate-publishable-packages: ${PUBLISHABLE_PACKAGES.length} publint + ${ATTW_CHECKS.length} attw OK`,
);
