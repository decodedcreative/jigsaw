import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

import {
  collectColorSuffixes,
  collectSemanticColorAliases,
  discoverSemanticColorVars,
} from "./discover-semantic-color-vars.mjs";

const packageRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../..",
);

describe("collectColorSuffixes", () => {
  it("flattens nested semantic colour groups", () => {
    const tree = {
      surface: {
        primary: { value: "#fff", type: "color" },
        default: { value: "#fff", type: "color" },
      },
      focus: {
        ring: { value: "#000", type: "color" },
      },
    };

    expect(collectColorSuffixes(tree).sort()).toEqual([
      "focus-ring",
      "surface-default",
      "surface-primary",
    ]);
  });
});

describe("collectSemanticColorAliases", () => {
  it("maps groups with a default leaf to Tailwind DEFAULT utilities", () => {
    const aliases = collectSemanticColorAliases({
      surface: { primary: { value: "#fff", type: "color" }, default: { value: "#fff", type: "color" } },
      border: { default: { value: "#eee", type: "color" } },
      link: { default: { value: "#00f", type: "color" }, hover: { value: "#00a", type: "color" } },
      interactive: { accent: { value: "#f00", type: "color" } },
    });

    expect(aliases).toEqual({
      surface: "surface-default",
      border: "border-default",
      link: "link-default",
    });
  });
});

describe("discoverSemanticColorVars", () => {
  const { semanticColorVars, semanticColorAliases } = discoverSemanticColorVars();

  it("discovers semantic suffixes from @jigsaw/theme-default JSON", () => {
    expect(semanticColorVars).toContain("surface-primary");
    expect(semanticColorVars).toContain("interactive-accent");
    expect(semanticColorVars).toContain("focus-ring");
    expect(semanticColorVars).toContain("focus-ring-offset");
  });

  it("derives DEFAULT aliases from theme JSON structure", () => {
    expect(semanticColorAliases).toEqual({
      surface: "surface-default",
      border: "border-default",
      link: "link-default",
    });
  });

  it("matches semantic CSS variables emitted by theme-default", () => {
    const cssPath = path.resolve(
      packageRoot,
      "../themes/default/dist/css/semantic-light.css",
    );
    const css = fs.readFileSync(cssPath, "utf8");
    const cssVars = [...css.matchAll(/--color-([a-z0-9-]+):/g)].map((match) => match[1]);

    expect(semanticColorVars.sort()).toEqual(cssVars.sort());
  });
});
