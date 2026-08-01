#!/usr/bin/env node
/**
 * Sync `package.json` `exports` with discovered public entry points.
 *
 *   node scripts/sync-package-exports.mjs
 *   node scripts/sync-package-exports.mjs --check
 */
import { syncPackageExports } from "./public-entries.mjs";

const check = process.argv.includes("--check");
const result = syncPackageExports({ write: !check });

if (check) {
  if (result.changed) {
    console.error(
      "package.json exports are out of date. Run: node scripts/sync-package-exports.mjs"
    );
    process.exit(1);
  }
  console.log(`sync-package-exports: OK (${result.entries.length} subpaths)`);
  process.exit(0);
}

if (result.changed) {
  console.log(
    `sync-package-exports: updated exports (${result.entries.length} subpaths)`
  );
} else {
  console.log(
    `sync-package-exports: already up to date (${result.entries.length} subpaths)`
  );
}
