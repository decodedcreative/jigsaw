import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { Plugin } from "esbuild";
import { defineConfig } from "tsup";
import { preserveDirectivesPlugin } from "esbuild-plugin-preserve-directives";
import { getDtsEntryRecord } from "./scripts/public-entries.mjs";

const root = path.dirname(fileURLToPath(import.meta.url));
const srcRoot = path.join(root, "src");

/**
 * Map tsconfig path aliases to absolute directories under src/.
 * Used by the rewrite plugin so we can `bundle: false` (esbuild forbids
 * `alias` without bundling).
 */
const aliasRoots: Record<string, string> = {
  "@components": path.join(srcRoot, "components"),
  "@hooks": path.join(srcRoot, "hooks"),
  "@providers/theme": path.join(srcRoot, "providers/theme/index.ts"),
  "@providers": path.join(srcRoot, "providers"),
  "@utils": path.join(srcRoot, "utils"),
  "@jsw-types": path.join(srcRoot, "types"),
};

for (const [alias, target] of Object.entries(aliasRoots)) {
  if (!fs.existsSync(target)) {
    throw new Error(
      `tsup aliasRoots["${alias}"] points at missing path: ${target}`
    );
  }
}

/** Longest alias first so `@providers/theme` wins over `@providers`. */
const aliasesLongestFirst = Object.keys(aliasRoots).sort(
  (a, b) => b.length - a.length
);

/**
 * Find which configured alias (if any) the import request uses, and the path
 * rest after the alias prefix (empty when the request is exactly the alias).
 */
function matchAlias(
  request: string
): { alias: string; rest: string } | null {
  for (const alias of aliasesLongestFirst) {
    if (request === alias) return { alias, rest: "" };
    if (request.startsWith(`${alias}/`)) {
      return { alias, rest: request.slice(alias.length + 1) };
    }
  }
  return null;
}

/** Resolve an absolute path to an existing `.ts` / `.tsx` / `index` file. */
function resolveExistingModule(absolute: string): string | null {
  if (fs.existsSync(absolute) && fs.statSync(absolute).isFile()) {
    return absolute;
  }
  for (const ext of [".ts", ".tsx", "/index.ts", "/index.tsx"]) {
    const candidate = absolute + ext;
    if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) {
      return candidate;
    }
  }
  return null;
}

/** Turn an absolute source file into a relative import from `importer`. */
function toRelativeImport(importer: string, absoluteFile: string): string {
  const importerDir = path.dirname(importer);
  let relative = path.relative(importerDir, absoluteFile).replace(/\\/g, "/");
  relative = relative.replace(/\.tsx?$/, "");
  if (!relative.startsWith(".")) relative = `./${relative}`;
  return relative;
}

/**
 * Rewrite a path-alias import (`@components/...`) to a relative path, or
 * return `null` when the request is not an alias.
 *
 * Throws when the request matches an alias but no file exists — silent
 * fallthrough would emit a broken relative path in dist.
 */
function resolveAliasImport(
  importer: string,
  request: string
): string | null {
  const matched = matchAlias(request);
  if (!matched) return null;

  const target = aliasRoots[matched.alias];
  const absolute = matched.rest
    ? path.join(target.replace(/\.tsx?$/, ""), matched.rest)
    : target;

  const resolved = resolveExistingModule(absolute);
  if (!resolved) {
    throw new Error(
      `Failed to resolve alias import "${request}" from ${importer} (looked under ${absolute})`
    );
  }

  return toRelativeImport(importer, resolved);
}

/**
 * Rewrite one `from "…"` / `import("…")` specifier when it uses a path alias.
 * Non-alias imports are left unchanged.
 */
function rewriteImportSpecifier(
  importer: string,
  match: string,
  prefix: string,
  request: string
): string {
  const rewritten = resolveAliasImport(importer, request);
  if (!rewritten) return match;
  const quote = match.includes('"') ? '"' : "'";
  return `${prefix}${quote}${rewritten}${quote}`;
}

/**
 * esbuild plugin: rewrite `@components` / `@utils` / … imports to relative
 * paths so each file can be emitted independently (`bundle: false`) while
 * remaining resolvable by consumers that do not share our tsconfig paths.
 */
function rewritePathAliasesPlugin(): Plugin {
  return {
    name: "rewrite-path-aliases",
    setup(build) {
      build.onLoad({ filter: /\.[jt]sx?$/ }, async (args) => {
        // Leave third-party packages alone — only rewrite our own sources.
        if (args.path.includes(`${path.sep}node_modules${path.sep}`)) {
          return null;
        }

        const source = await fs.promises.readFile(args.path, "utf8");
        const next = source.replace(
          /(from\s+|import\s*\(\s*)["']([^"']+)["']/g,
          (match, prefix: string, request: string) =>
            rewriteImportSpecifier(args.path, match, prefix, request)
        );

        const loader = args.path.endsWith("x") ? "tsx" : "ts";
        return { contents: next, loader };
      });
    },
  };
}

/**
 * esbuild puts `"use strict"` first in CJS; Next/React need `"use client"`
 * as the very first statement. Rewrite matching CJS outputs after emit.
 */
function ensureUseClientBeforeUseStrict(distDir: string): void {
  const stack = [distDir];
  while (stack.length > 0) {
    const dir = stack.pop()!;
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        stack.push(full);
        continue;
      }
      if (!entry.name.endsWith(".js") || entry.name.endsWith(".map.js")) {
        continue;
      }
      const source = fs.readFileSync(full, "utf8");
      if (
        !source.includes('"use client"') &&
        !source.includes("'use client'")
      ) {
        continue;
      }
      const withoutDirective = source
        .replace(/^["']use client["'];\s*/m, "")
        .replace(/^"use strict";\s*/m, "");
      const next = `"use client";\n"use strict";\n${withoutDirective}`;
      if (next !== source) {
        fs.writeFileSync(full, next);
      }
    }
  }
}

const sharedExternal = [
  "react",
  "react-dom",
  "react-aria-components",
  "react-aria-components/Toast",
  /^@phosphor-icons\/react(\/.*)?$/,
  "class-variance-authority",
  "tailwind-merge",
  "@jigsaw-ds/tokens",
] as const;

/**
 * Compile each source file separately so `"use client"` stays on the modules
 * that declare it. A single bundled entry would force one client boundary on
 * the whole package (including RSC-safe presentational components).
 *
 * Types are emitted from a second multi-entry pass so each public subpath
 * (`./badge`, `./theme`, …) has matching `.d.ts` / `.d.mts` files.
 */
export default defineConfig([
  {
    entry: [
      "src/**/*.{ts,tsx}",
      "!src/**/*.{test,stories}.*",
      "!src/**/*.test.*",
      "!src/**/*.stories.*",
      "!src/test-setup.ts",
    ],
    format: ["cjs", "esm"],
    dts: false,
    bundle: false,
    sourcemap: true,
    clean: true,
    external: [...sharedExternal],
    esbuildPlugins: [
      rewritePathAliasesPlugin(),
      preserveDirectivesPlugin({
        directives: ["use client"],
        include: /\.(js|ts|jsx|tsx)$/,
        exclude: /node_modules/,
      }),
    ],
    async onSuccess() {
      ensureUseClientBeforeUseStrict(path.join(root, "dist"));
    },
  },
  {
    entry: getDtsEntryRecord(),
    format: ["cjs", "esm"],
    dts: { only: true },
    sourcemap: false,
    clean: false,
    external: [...sharedExternal],
  },
]);
