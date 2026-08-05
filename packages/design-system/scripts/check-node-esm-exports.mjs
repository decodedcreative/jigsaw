import { readFile } from "node:fs/promises";
import process, { stderr, stdout } from "node:process";
import { URL } from "node:url";

const packageJson = JSON.parse(
  await readFile(new URL("../package.json", import.meta.url), "utf8")
);

const esmSubpaths = Object.entries(packageJson.exports)
  .filter(([, target]) => target?.import?.default)
  .map(([subpath]) => subpath);

const packageSpecifiers = esmSubpaths.map((subpath) =>
  subpath === "." ? packageJson.name : `${packageJson.name}${subpath.slice(1)}`
);

const failures = [];
for (const specifier of packageSpecifiers) {
  try {
    await import(specifier);
  } catch (error) {
    failures.push({ specifier, error });
  }
}

if (failures.length > 0) {
  for (const { specifier, error } of failures) {
    stderr.write(`[node-esm] Failed to import ${specifier}\n`);
    stderr.write(`${error?.stack ?? error}\n`);
  }
  process.exitCode = 1;
} else {
  stdout.write(
    `[node-esm] Imported ${packageSpecifiers.length} package exports successfully\n`
  );
}
