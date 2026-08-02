import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import {
  buildPackageExports,
  listPublicEntries,
} from "../scripts/public-entries.mjs";

const packageRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  ".."
);
const distRoot = path.join(packageRoot, "dist");
const require = createRequire(import.meta.url);

const presentationalSubpaths = [
  "badge",
  "text",
  "heading",
  "skeleton",
  "icon",
  "card",
];

function collectRelativeImports(entryRel: string): string[] {
  const visited = new Set<string>();
  const queue = [entryRel];

  while (queue.length > 0) {
    const rel = queue.pop()!;
    if (visited.has(rel)) continue;
    visited.add(rel);

    const full = path.join(distRoot, rel);
    if (!existsSync(full)) continue;

    const source = readFileSync(full, "utf8");
    const importRe = /from\s+["'](\.[^"']+)["']/g;
    let match: RegExpExecArray | null;
    while ((match = importRe.exec(source))) {
      const resolved = path.normalize(
        path.join(path.dirname(rel), `${match[1].replace(/\.mjs$/, "")}.mjs`)
      );
      if (!visited.has(resolved)) queue.push(resolved);
    }
  }

  return [...visited];
}

function hasUseClient(rel: string): boolean {
  const full = path.join(distRoot, rel);
  if (!existsSync(full)) return false;
  const source = readFileSync(full, "utf8");
  return source.includes('"use client"') || source.includes("'use client'");
}

describe("public package subpath exports", () => {
  it("lists every component folder with an index.ts", () => {
    const entries = listPublicEntries();
    const subpaths = entries.map((entry) => entry.subpath);

    expect(subpaths).toEqual(expect.arrayContaining(presentationalSubpaths));
    expect(subpaths).toEqual(
      expect.arrayContaining(["theme", "providers", "utils", "button", "link"])
    );
    expect(new Set(subpaths).size).toBe(subpaths.length);
  });

  it("keeps package.json exports in sync with discovered entries", () => {
    const pkg = require("../package.json") as {
      exports: Record<string, unknown>;
    };
    expect(pkg.exports).toEqual(buildPackageExports());
  });

  it("emits JS + types for each public subpath after build", () => {
    if (!existsSync(path.join(distRoot, "index.mjs"))) {
      expect.fail(
        "dist/ missing — run `npm run build --workspace=@jigsaw-ds/design-system` first"
      );
    }

    for (const entry of listPublicEntries()) {
      const base = path.join(distRoot, entry.distDir, "index");
      for (const ext of [".mjs", ".js", ".d.mts", ".d.ts"]) {
        expect(
          existsSync(`${base}${ext}`),
          `missing ${entry.distDir}/index${ext}`
        ).toBe(true);
      }
    }
  });

  it("resolves every public subpath through package exports (Node require)", () => {
    if (!existsSync(path.join(distRoot, "index.js"))) {
      expect.fail(
        "dist/ missing — run `npm run build --workspace=@jigsaw-ds/design-system` first"
      );
    }

    // Resolve as a consumer would: package name + subpath, from this package root.
    const consumerRequire = createRequire(
      path.join(packageRoot, "package.json")
    );

    for (const entry of listPublicEntries()) {
      const id = `@jigsaw-ds/design-system/${entry.subpath}`;
      let resolved: string;
      try {
        resolved = consumerRequire.resolve(id);
      } catch (error) {
        expect.fail(
          `package exports failed to resolve ${id}: ${(error as Error).message}`
        );
      }
      expect(existsSync(resolved), `${id} → missing file ${resolved}`).toBe(
        true
      );
      expect(resolved.replaceAll("\\", "/")).toContain(
        `/dist/${entry.distDir}/`
      );
    }
  });

  it("keeps presentational subpath graphs free of use client modules", () => {
    if (!existsSync(path.join(distRoot, "components/badge/index.mjs"))) {
      expect.fail(
        "dist/ missing — run `npm run build --workspace=@jigsaw-ds/design-system` first"
      );
    }

    for (const subpath of presentationalSubpaths) {
      const graph = collectRelativeImports(`components/${subpath}/index.mjs`);
      const clientModules = graph.filter((rel) => hasUseClient(rel));
      expect(
        clientModules,
        `${subpath} subpath import graph must not reach "use client" modules`
      ).toEqual([]);
    }
  });

  // Intentional: the root barrel MUST keep exporting interactive / client modules
  // for client apps and Storybook. RSC consumers use subpaths instead — do not
  // strip Button/Modal/etc. from ".".
  it("documents that the root barrel pulls client modules (unsafe for RSC)", () => {
    if (!existsSync(path.join(distRoot, "index.mjs"))) {
      expect.fail(
        "dist/ missing — run `npm run build --workspace=@jigsaw-ds/design-system` first"
      );
    }

    const graph = collectRelativeImports("index.mjs");
    const clientModules = graph.filter((rel) => hasUseClient(rel));
    expect(clientModules.length).toBeGreaterThan(0);
    expect(clientModules.some((rel) => rel.includes("button"))).toBe(true);
  });
});
