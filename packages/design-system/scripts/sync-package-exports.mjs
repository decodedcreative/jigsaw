#!/usr/bin/env node
/**
 * Sync `package.json` `exports` with discovered public entry points.
 *
 *   node scripts/sync-package-exports.mjs
 *   node scripts/sync-package-exports.mjs --check
 */
import { readFileSync } from "node:fs";
import { syncPackageExports } from "./public-entries.mjs";

const check = process.argv.includes("--check");

function exportKeys(exportsMap) {
  return Object.keys(exportsMap ?? {}).sort();
}

function formatKeyDiff(expected, actual) {
  const expectedKeys = new Set(exportKeys(expected));
  const actualKeys = new Set(exportKeys(actual));
  const missing = [...expectedKeys].filter((key) => !actualKeys.has(key));
  const extra = [...actualKeys].filter((key) => !expectedKeys.has(key));
  const lines = [];
  if (missing.length > 0) {
    lines.push(`  missing from package.json: ${missing.join(", ")}`);
  }
  if (extra.length > 0) {
    lines.push(`  unexpected in package.json: ${extra.join(", ")}`);
  }
  if (missing.length === 0 && extra.length === 0) {
    lines.push(
      "  export keys match but target values differ — re-run sync to rewrite package.json"
    );
  }
  return lines.join("\n");
}

let result;
try {
  result = syncPackageExports({ write: !check });
} catch (error) {
  console.error("[sync-package-exports] failed while discovering public entries");
  console.error(error instanceof Error ? error.stack || error.message : error);
  process.exit(1);
}

const subpaths = result.entries.map((entry) => `./${entry.subpath}`);

if (check) {
  if (result.changed) {
    let currentExports = {};
    try {
      currentExports = JSON.parse(
        readFileSync(result.packageJsonPath, "utf8")
      ).exports;
    } catch (error) {
      console.error(
        "[sync-package-exports] could not read package.json for diff:",
        error instanceof Error ? error.message : error
      );
    }

    console.error("[sync-package-exports] CHECK FAILED — package.json exports are out of date.");
    console.error(`  discovered ${result.entries.length} public subpaths: ${subpaths.join(", ")}`);
    console.error(formatKeyDiff(result.exports, currentExports));
    console.error("  fix: npm run sync-exports --workspace=@jigsaw-ds/design-system");
    console.error("  then commit the updated packages/design-system/package.json");
    process.exit(1);
  }

  console.log(
    `[sync-package-exports] CHECK OK — ${result.entries.length} subpaths in sync (${subpaths.join(", ")})`
  );
  process.exit(0);
}

if (result.changed) {
  console.log(
    `[sync-package-exports] updated package.json exports (${result.entries.length} subpaths)`
  );
  console.log(`  ${subpaths.join(", ")}`);
} else {
  console.log(
    `[sync-package-exports] already up to date (${result.entries.length} subpaths)`
  );
}
