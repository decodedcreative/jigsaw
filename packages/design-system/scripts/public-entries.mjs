/**
 * Discover public package entry points for @jigsaw-ds/design-system.
 *
 * Keeps package.json exports and the tsup declaration build in sync with
 * each component folder index under src/components, plus theme / providers / utils.
 */
import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const packageRoot = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const srcRoot = path.join(packageRoot, "src");
const componentsRoot = path.join(srcRoot, "components");
const packageJsonPath = path.join(packageRoot, "package.json");

/** Shared non-component entry points consumers may import on purpose. */
const SHARED_ENTRIES = [
  {
    subpath: "theme",
    source: "src/theme/index.ts",
    distDir: "theme",
  },
  {
    subpath: "providers",
    source: "src/providers/index.ts",
    distDir: "providers",
  },
  {
    subpath: "utils",
    source: "src/utils/index.ts",
    distDir: "utils",
  },
];

function listComponentNames() {
  return readdirSync(componentsRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .filter((name) => existsSync(path.join(componentsRoot, name, "index.ts")))
    .sort();
}

export function listPublicEntries() {
  const components = listComponentNames().map((name) => ({
    subpath: name,
    source: "src/components/" + name + "/index.ts",
    distDir: "components/" + name,
    dtsEntryKey: "components/" + name + "/index",
  }));

  const shared = SHARED_ENTRIES.map((entry) => ({
    ...entry,
    dtsEntryKey: entry.distDir + "/index",
  }));

  for (const entry of [...shared, ...components]) {
    const absolute = path.join(packageRoot, entry.source);
    if (!existsSync(absolute)) {
      throw new Error("public entry missing source file: " + entry.source);
    }
  }

  return [...shared, ...components];
}

/** tsup entry record for the declaration-only build. */
export function getDtsEntryRecord() {
  const entry = {
    index: "src/index.ts",
  };
  for (const item of listPublicEntries()) {
    entry[item.dtsEntryKey] = item.source;
  }
  return entry;
}

function conditionalExport(distDir) {
  const base = "./dist/" + distDir + "/index";
  return {
    import: {
      types: base + ".d.mts",
      default: base + ".mjs",
    },
    require: {
      types: base + ".d.ts",
      default: base + ".js",
    },
  };
}

/** Full exports map for package.json (root + CSS + public subpaths). */
export function buildPackageExports() {
  const exportsMap = {
    ".": {
      import: {
        types: "./dist/index.d.mts",
        default: "./dist/index.mjs",
      },
      require: {
        types: "./dist/index.d.ts",
        default: "./dist/index.js",
      },
    },
    "./tailwind.css": "./tailwind.css",
  };

  for (const entry of listPublicEntries()) {
    exportsMap["./" + entry.subpath] = conditionalExport(entry.distDir);
  }

  return exportsMap;
}

export function syncPackageExports({ write = true } = {}) {
  const pkg = JSON.parse(readFileSync(packageJsonPath, "utf8"));
  const nextExports = buildPackageExports();
  const before = JSON.stringify(pkg.exports);
  const after = JSON.stringify(nextExports);
  const changed = before !== after;

  if (changed && write) {
    pkg.exports = nextExports;
    writeFileSync(packageJsonPath, JSON.stringify(pkg, null, 2) + "\n");
  }

  return {
    changed,
    exports: nextExports,
    entries: listPublicEntries(),
    packageJsonPath,
  };
}
