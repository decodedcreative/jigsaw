import { readFileSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

/**
 * Presentational modules that must stay RSC-safe: no theme hooks / useContext.
 * Avatar is intentionally excluded — it still needs "use client" for image error state.
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

const bannedHookImports = [
  "useGetClassNames",
  "useRootClassName",
  "useThemeProvider",
];

const componentsRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../components"
);

describe("presentational RSC boundary (JSW-110)", () => {
  it("does not import theme hooks in presentational components", () => {
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

  it("lists every presentational module that exists on disk", () => {
    for (const relative of presentationalModules) {
      const full = path.join(componentsRoot, relative);
      expect(statSync(full).isFile()).toBe(true);
    }
  });
});
