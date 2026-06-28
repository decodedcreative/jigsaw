import { describe, expect, it } from "vitest";

import {
  collectColorSuffixes,
  collectSemanticColorAliases,
  discoverSemanticColorVars,
} from "./discover-semantic-color-vars.mjs";

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

  it("discovers semantic suffixes from @jigsaw-ds/theme-default JSON", () => {
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

  it("lists unique kebab-case suffixes for Tailwind colour utilities", () => {
    const unique = new Set(semanticColorVars);
    expect(unique.size).toBe(semanticColorVars.length);
    expect(semanticColorVars.every((suffix) => /^[a-z0-9-]+$/.test(suffix))).toBe(
      true,
    );
  });

  it("maps DEFAULT aliases to discovered suffixes", () => {
    for (const target of Object.values(semanticColorAliases)) {
      expect(semanticColorVars).toContain(target);
    }
  });
});
