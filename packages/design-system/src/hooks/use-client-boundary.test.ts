import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

/**
 * Guard for interactive components that still use theme/className hooks.
 *
 * Those hooks call `useContext`, so any production component that references
 * them must declare `"use client"`. Companion to
 * `presentational-rsc-boundary.test.ts`, which asserts the inverse for
 * Server-safe primitives.
 *
 * Intentionally a lightweight source scan (same approach as the presentational
 * guard) — false positives are rare because the hook names are package-specific.
 */
const hooksThatRequireClient = [
  "useGetClassNames",
  "useRootClassName",
  "useThemeProvider",
];

const componentsRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../components"
);

function walk(dir: string): string[] {
  const entries = readdirSync(dir);
  const files: string[] = [];
  for (const entry of entries) {
    const full = path.join(dir, entry);
    if (statSync(full).isDirectory()) {
      files.push(...walk(full));
      continue;
    }
    if (!/\.(tsx|ts)$/.test(entry)) continue;
    if (/\.(test|stories|styles|types)\./.test(entry)) continue;
    files.push(full);
  }
  return files;
}

describe("interactive modules declare use client", () => {
  it("marks components that call theme/className hooks with \"use client\"", () => {
    const offenders: string[] = [];

    for (const file of walk(componentsRoot)) {
      const source = readFileSync(file, "utf8");
      const usesClientHook = hooksThatRequireClient.some((hook) =>
        new RegExp(`\\b${hook}\\b`).test(source)
      );
      if (!usesClientHook) continue;
      if (!/["']use client["']/.test(source)) {
        offenders.push(path.relative(componentsRoot, file));
      }
    }

    expect(offenders).toEqual([]);
  });
});
