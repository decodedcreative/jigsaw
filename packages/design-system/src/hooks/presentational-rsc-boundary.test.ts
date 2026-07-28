import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

/**
 * Allowlist of modules that must remain Server-Component-safe:
 * no theme hooks (useContext) and no `"use client"` directive.
 *
 * Avatar is excluded on purpose — it needs client state for image `onError`.
 * When a new presentational primitive is added under one of these folders,
 * include it here (or the scan test below will fail).
 */
const presentationalModules = [
  "badge/Badge.tsx",
  "text/Text.tsx",
  "heading/Heading.tsx",
  "heading/Heading.aliases.tsx",
  "skeleton/Skeleton.tsx",
  "icon/Icon.tsx",
  "card/Card.tsx",
  "card/CardHeader.tsx",
];

/** Folders whose production `.tsx` files are expected to be presentational. */
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

describe("presentational components stay server-safe", () => {
  it("does not use theme hooks or \"use client\"", () => {
    const offenders: string[] = [];

    for (const relative of presentationalModules) {
      const source = readFileSync(path.join(componentsRoot, relative), "utf8");
      for (const hook of bannedHookImports) {
        if (new RegExp(`\\b${hook}\\b`).test(source)) {
          offenders.push(`${relative} imports ${hook}`);
        }
      }
      if (/["']use client["']/.test(source)) {
        offenders.push(`${relative} still has "use client"`);
      }
    }

    expect(offenders).toEqual([]);
  });

  it("allowlist matches every production module in presentational folders", () => {
    const discovered = presentationalFolders.flatMap((folder) =>
      listProductionTsx(path.join(componentsRoot, folder), folder)
    );

    expect(discovered.sort()).toEqual([...presentationalModules].sort());
  });
});
