import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { Plugin } from "esbuild";
import { defineConfig } from "tsup";
import { preserveDirectivesPlugin } from "esbuild-plugin-preserve-directives";

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

function resolveAliasImport(
  importer: string,
  request: string
): string | null {
  const aliases = Object.keys(aliasRoots).sort((a, b) => b.length - a.length);
  for (const alias of aliases) {
    if (request === alias || request.startsWith(`${alias}/`)) {
      const rest = request === alias ? "" : request.slice(alias.length + 1);
      const target = aliasRoots[alias];
      const absolute = rest
        ? path.join(target.replace(/\.tsx?$/, ""), rest)
        : target;
      const resolved = resolveExistingModule(absolute);
      if (!resolved) {
        throw new Error(
          `Failed to resolve alias import "${request}" from ${importer} (looked under ${absolute})`
        );
      }
      const importerDir = path.dirname(importer);
      let relative = path.relative(importerDir, resolved).replace(/\\/g, "/");
      relative = relative.replace(/\.tsx?$/, "");
      if (!relative.startsWith(".")) relative = `./${relative}`;
      return relative;
    }
  }
  return null;
}

/**
 * Rewrite `@components` / `@utils` / … imports to relative paths so each file
 * can be emitted independently while remaining resolvable by consumers.
 */
function rewritePathAliasesPlugin(): Plugin {
  return {
    name: "rewrite-path-aliases",
    setup(build) {
      build.onLoad({ filter: /\.[jt]sx?$/ }, async (args) => {
        if (args.path.includes(`${path.sep}node_modules${path.sep}`)) {
          return null;
        }
        const source = await fs.promises.readFile(args.path, "utf8");
        const next = source.replace(
          /(from\s+|import\s*\(\s*)["']([^"']+)["']/g,
          (match, prefix: string, request: string) => {
            const rewritten = resolveAliasImport(args.path, request);
            if (!rewritten) return match;
            const quote = match.includes('"') ? '"' : "'";
            return `${prefix}${quote}${rewritten}${quote}`;
          }
        );
        const loader = args.path.endsWith("x") ? "tsx" : "ts";
        return { contents: next, loader };
      });
    },
  };
}

const sharedExternal = [
  "react",
  "react-dom",
  "react-aria-components",
  "react-aria-components/Toast",
  "@phosphor-icons/react",
  "class-variance-authority",
  "tailwind-merge",
  "@jigsaw-ds/tokens",
] as const;

/**
 * Compile each source file separately so `"use client"` stays on the modules
 * that declare it. A single bundled entry would force one client boundary on
 * the whole package (including RSC-safe presentational components).
 *
 * Types are emitted from a second, single-entry pass so path aliases resolve
 * into one consumer-facing `index.d.ts` / `index.d.mts` without OOM.
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
      // esbuild prepends "use strict" in CJS; Next/React need "use client" first.
      const dist = path.join(root, "dist");
      const stack = [dist];
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
    },
  },
  {
    entry: ["src/index.ts"],
    format: ["cjs", "esm"],
    dts: { only: true },
    sourcemap: false,
    clean: false,
    external: [...sharedExternal],
  },
]);
