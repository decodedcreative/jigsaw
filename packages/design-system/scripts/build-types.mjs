#!/usr/bin/env node
/**
 * Emit the package's type declarations with tsc.
 *
 *   node scripts/build-types.mjs           # one build
 *   node scripts/build-types.mjs --watch   # rebuild when src/ changes
 *
 * tsc writes one `.d.ts` per source file next to the JS that tsup emits
 * (both keep the src/ layout under dist/). This replaces tsup's DTS pass,
 * which bundled declarations per public entry and needed ~4 GB of heap for
 * 28 entries (JSW-138). tsc builds one program for the whole package.
 *
 * Two post-processing steps:
 *
 * 1. Path aliases (`@components/…`, `@utils/…`) are rewritten to relative
 *    paths. tsc keeps them as written, and consumers don't share our tsconfig.
 * 2. Every `.d.ts` gets a `.d.mts` twin for the `import` condition, with
 *    relative specifiers made explicit (`./Button.mjs`, `./button/index.mjs`),
 *    because Node ESM resolution requires extensions. TypeScript maps `.mjs`
 *    to the `.d.mts` next to it.
 */
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const packageRoot = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const srcRoot = path.join(packageRoot, "src");
const distRoot = path.join(packageRoot, "dist");
const tsconfigPath = path.join(packageRoot, "tsconfig.build.json");

/** Keep in sync with tsconfig.json `paths` (and aliasRoots in tsup.config.ts). */
const aliasRoots = {
  "@components": path.join(srcRoot, "components"),
  "@hooks": path.join(srcRoot, "hooks"),
  "@providers/theme": path.join(srcRoot, "providers/theme/index.ts"),
  "@providers": path.join(srcRoot, "providers"),
  "@utils": path.join(srcRoot, "utils"),
  "@jsw-types": path.join(srcRoot, "types"),
};
const aliasesLongestFirst = Object.keys(aliasRoots).sort((a, b) => b.length - a.length);

/** Module specifiers in `from "…"`, `import("…")` and `import "…"`. */
const SPECIFIER = /(\bfrom\s+|\bimport\s*\(\s*|\bimport\s+)(["'])([^"']+)\2/g;

/**
 * Replace each module specifier in `source` with `rewrite(request)`.
 * Returning `null` leaves that specifier unchanged.
 */
function rewriteSpecifiers(source, rewrite) {
  return source.replace(SPECIFIER, (match, prefix, quote, request) => {
    const next = rewrite(request);
    return next == null ? match : `${prefix}${quote}${next}${quote}`;
  });
}

function listFiles(dir, predicate, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) listFiles(full, predicate, out);
    else if (predicate(entry.name)) out.push(full);
  }
  return out;
}

const isDeclaration = (name) => name.endsWith(".d.ts") || name.endsWith(".d.mts");

function isFile(p) {
  return fs.existsSync(p) && fs.statSync(p).isFile();
}

/** Resolve a src/ path (no extension) to the source file tsc compiled. */
function resolveSourceModule(absolute) {
  if (isFile(absolute)) return absolute;
  for (const ext of [".ts", ".tsx", "/index.ts", "/index.tsx"]) {
    if (isFile(absolute + ext)) return absolute + ext;
  }
  return null;
}

/** `@components/heading/Heading.types` → `../../heading/Heading.types`, relative to the importer. */
function rewriteAlias(request, importerSrcPath) {
  for (const alias of aliasesLongestFirst) {
    if (request !== alias && !request.startsWith(`${alias}/`)) continue;
    const rest = request.slice(alias.length + 1);
    const target = aliasRoots[alias];
    const absolute = rest ? path.join(target.replace(/\.tsx?$/, ""), rest) : target;
    const resolved = resolveSourceModule(absolute);
    if (!resolved) {
      throw new Error(`Cannot resolve alias "${request}" from ${importerSrcPath}`);
    }
    let relative = path
      .relative(path.dirname(importerSrcPath), resolved)
      .replace(/\\/g, "/")
      .replace(/\.tsx?$/, "")
      .replace(/\/index$/, "");
    if (!relative.startsWith(".")) relative = `./${relative}`;
    return relative;
  }
  return null;
}

/** `./Button` → `./Button.mjs`, `./button` → `./button/index.mjs`, for a `.d.mts` in `dir`. */
function toExplicitEsmSpecifier(request, dir, file) {
  const absolute = path.resolve(dir, request);
  if (isFile(`${absolute}.d.ts`)) return `${request}.mjs`;
  if (isFile(path.join(absolute, "index.d.ts"))) return `${request.replace(/\/$/, "")}/index.mjs`;
  throw new Error(`Cannot resolve "${request}" from ${file}`);
}

function build() {
  const started = Date.now();

  // tsup no longer owns declarations, so clear stale ones (e.g. from deleted sources).
  for (const file of listFiles(distRoot, isDeclaration)) fs.rmSync(file);

  const tsc = require.resolve("typescript/bin/tsc");
  execFileSync(process.execPath, [tsc, "-p", tsconfigPath], {
    cwd: packageRoot,
    stdio: "inherit",
  });

  const declarations = listFiles(distRoot, (name) => name.endsWith(".d.ts"));

  // Pass 1: aliases → relative, in place, so pass 2 sees real paths.
  for (const file of declarations) {
    const importerSrcPath = path.join(srcRoot, path.relative(distRoot, file)).replace(/\.d\.ts$/, ".ts");
    const source = fs.readFileSync(file, "utf8");
    const next = rewriteSpecifiers(source, (request) => rewriteAlias(request, importerSrcPath));
    if (next !== source) fs.writeFileSync(file, next);
  }

  // Pass 2: `.d.mts` twins with explicit relative specifiers.
  for (const file of declarations) {
    const dir = path.dirname(file);
    const esm = rewriteSpecifiers(fs.readFileSync(file, "utf8"), (request) =>
      request.startsWith(".") ? toExplicitEsmSpecifier(request, dir, file) : null
    );
    fs.writeFileSync(file.replace(/\.d\.ts$/, ".d.mts"), esm);
  }

  console.log(
    `[build-types] ${declarations.length} declaration files (+ .d.mts) in ${((Date.now() - started) / 1000).toFixed(1)}s`
  );
}

build();

if (process.argv.includes("--watch")) {
  let timer;
  const watcher = fs.watch(srcRoot, { recursive: true }, (_event, filename) => {
    if (!filename || /\.(test|stories)\./.test(filename) || !/\.tsx?$/.test(filename)) return;
    clearTimeout(timer);
    timer = setTimeout(() => {
      try {
        build();
      } catch (error) {
        // Keep watching; tsc has already printed the type errors.
        console.error(`[build-types] failed: ${error.message}`);
      }
    }, 300);
  });
  // A watcher that errors (e.g. src/ removed or remounted) is closed by Node and
  // won't recover. Say so and exit non-zero, rather than crash with a bare
  // stack trace or keep running while silently no longer rebuilding types.
  watcher.on("error", (error) => {
    console.error(`[build-types] stopped watching src/: ${error.message}. Restart \`npm run dev\`.`);
    process.exit(1);
  });
  console.log("[build-types] watching src/ for changes");
}
