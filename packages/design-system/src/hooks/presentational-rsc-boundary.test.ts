import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

/**
 * Folders that define the presentational (RSC-safe) surface.
 * Every production `.tsx` under these folders is discovered automatically —
 * add a new primitive here and the checks below cover it without updating a
 * separate file list.
 *
 * Avatar lives outside this set on purpose (client image `onError` state).
 */
const presentationalFolders = [
  "badge",
  "text",
  "heading",
  "skeleton",
  "icon",
  "card",
];

const bannedHookImports = [
  "useGetClassNames",
  "useRootClassName",
  "useThemeProvider",
];

const componentsRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../components"
);

function listProductionTsx(dir: string, relativeDir: string): string[] {
  const entries = readdirSync(dir);
  const files: string[] = [];
  for (const entry of entries) {
    const full = path.join(dir, entry);
    if (statSync(full).isDirectory()) {
      files.push(...listProductionTsx(full, path.join(relativeDir, entry)));
      continue;
    }
    if (!/\.tsx$/.test(entry)) continue;
    if (/\.(test|stories)\.tsx$/.test(entry)) continue;
    files.push(path.join(relativeDir, entry));
  }
  return files;
}

function discoverPresentationalModules(): string[] {
  return presentationalFolders.flatMap((folder) =>
    listProductionTsx(path.join(componentsRoot, folder), folder)
  );
}

describe("presentational components stay server-safe", () => {
  it("discovers at least one module per presentational folder", () => {
    for (const folder of presentationalFolders) {
      const modules = listProductionTsx(
        path.join(componentsRoot, folder),
        folder
      );
      expect(
        modules.length,
        `expected production .tsx under components/${folder}`
      ).toBeGreaterThan(0);
    }
  });

  it("does not use theme hooks or \"use client\"", () => {
    const modules = discoverPresentationalModules();

    for (const relative of modules) {
      const source = readFileSync(path.join(componentsRoot, relative), "utf8");

      for (const hook of bannedHookImports) {
        expect(
          source,
          `${relative} must not import or reference ${hook} (theme hooks pull in React context and force a Client Component)`
        ).not.toMatch(new RegExp(`\\b${hook}\\b`));
      }

      expect(
        source,
        `${relative} must not include a "use client" directive`
      ).not.toMatch(/["']use client["']/);
    }
  });
});
