#!/usr/bin/env node
/**
 * Verify every public ESM subpath can be imported by Node.
 *
 *   node scripts/check-node-esm-exports.mjs
 *
 * Bundlers tolerate extensionless relative imports in the emitted ESM; Node
 * and Vitest do not. Run this against a built dist to catch that regression.
 */
import { readFile } from "node:fs/promises";

const packageJson = JSON.parse(
  await readFile(new URL("../package.json", import.meta.url), "utf8")
);

if (!packageJson.exports) {
  console.error("[node-esm] CHECK FAILED — package.json has no exports map");
  console.error("  fix: npm run sync-exports --workspace=@jigsaw-ds/design-system");
  process.exit(1);
}

const packageSpecifiers = Object.entries(packageJson.exports)
  .filter(([, target]) => target?.import?.default)
  .map(([subpath]) =>
    subpath === "." ? packageJson.name : `${packageJson.name}${subpath.slice(1)}`
  );

if (packageSpecifiers.length === 0) {
  console.error(
    "[node-esm] CHECK FAILED — no ESM exports discovered, so nothing was verified"
  );
  console.error(
    `  ${Object.keys(packageJson.exports).length} export key(s) present, none with an import condition`
  );
  process.exit(1);
}

const failures = [];
for (const specifier of packageSpecifiers) {
  try {
    await import(specifier);
  } catch (error) {
    failures.push({ specifier, error });
  }
}

if (failures.length > 0) {
  console.error(
    `[node-esm] CHECK FAILED — ${failures.length} of ${packageSpecifiers.length} exports are not Node-resolvable`
  );
  for (const { specifier, error } of failures) {
    console.error(`  ${specifier}`);
    console.error(error instanceof Error ? error.stack || error.message : error);
  }
  process.exit(1);
}

console.log(
  `[node-esm] CHECK OK — ${packageSpecifiers.length} package exports import cleanly`
);
