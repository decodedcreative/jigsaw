import { describe, expect, it } from "vitest";
import {
  baseCssSelector,
  capitalize,
  discoverFigmaThemes,
  discoverSemanticModes,
  discoverThemes,
  isStandaloneSemantic,
  mergeFigmaBaseAndSemantic,
  semanticCssSelector,
  sortAppearanceModes,
  splitSemanticByMode,
  themeBaseSourceGlob,
  themeSemanticSourceGlob,
  themeSourceGlob,
} from "./index.mjs";

describe("splitSemanticByMode", () => {
  it("returns false when there are no modes", () => {
    expect(splitSemanticByMode("default", [])).toBe(false);
  });

  it("returns true for multiple modes", () => {
    expect(splitSemanticByMode("default", ["light", "dark"])).toBe(true);
  });

  it("returns true for a single appearance mode", () => {
    expect(splitSemanticByMode("default", ["light"])).toBe(true);
    expect(splitSemanticByMode("default", ["dark"])).toBe(true);
  });

  it("returns false for a single theme-scoped mode", () => {
    expect(splitSemanticByMode("portfolio", ["portfolio"])).toBe(false);
  });
});

describe("mergeFigmaBaseAndSemantic", () => {
  it("merges when a single mode matches the theme id", () => {
    expect(mergeFigmaBaseAndSemantic("portfolio", ["portfolio"])).toBe(true);
  });

  it("does not merge for appearance or multi-mode themes", () => {
    expect(mergeFigmaBaseAndSemantic("default", ["light", "dark"])).toBe(false);
    expect(mergeFigmaBaseAndSemantic("default", ["light"])).toBe(false);
  });
});

describe("isStandaloneSemantic", () => {
  it("detects unusual single-prefix semantic exports", () => {
    expect(isStandaloneSemantic("brand", ["brand-alt"])).toBe(true);
  });

  it("returns false for appearance, theme-id, and multi-mode cases", () => {
    expect(isStandaloneSemantic("default", ["light"])).toBe(false);
    expect(isStandaloneSemantic("portfolio", ["portfolio"])).toBe(false);
    expect(isStandaloneSemantic("default", ["light", "dark"])).toBe(false);
  });
});

describe("sortAppearanceModes", () => {
  it("orders light before dark", () => {
    expect(sortAppearanceModes(["dark", "light"])).toEqual(["light", "dark"]);
  });

  it("keeps light before dark when other modes are present", () => {
    const sorted = sortAppearanceModes(["dark", "brand", "light"]);
    expect(sorted.indexOf("light")).toBeLessThan(sorted.indexOf("dark"));
  });
});

describe("CSS selectors", () => {
  it("baseCssSelector uses :root for default", () => {
    expect(baseCssSelector("default")).toBe(":root");
    expect(baseCssSelector("portfolio")).toBe("[data-theme='portfolio']");
  });

  it("semanticCssSelector maps default light and dark", () => {
    expect(semanticCssSelector("default", "light")).toBe(":root, [data-theme='light']");
    expect(semanticCssSelector("default", "dark")).toBe("[data-theme='dark'], .dark");
    expect(semanticCssSelector("portfolio", "portfolio")).toBe("[data-theme='portfolio']");
  });
});

describe("source globs", () => {
  it("builds theme-relative Style Dictionary globs", () => {
    expect(themeSourceGlob("default")).toBe(
      "../theme-default/src/tokens/**/*.json",
    );
    expect(themeBaseSourceGlob("default")).toBe(
      "../theme-default/src/tokens/base/**/*.json",
    );
    expect(themeSemanticSourceGlob("default")).toBe(
      "../theme-default/src/tokens/semantic/**/*.json",
    );
    expect(themeSourceGlob("portfolio")).toBe(
      "src/tokens/themes/portfolio/**/*.json",
    );
  });
});

describe("capitalize", () => {
  it("uppercases the first character", () => {
    expect(capitalize("portfolio")).toBe("Portfolio");
  });
});

describe("filesystem discovery", () => {
  it("discovers packaged theme ids from src/tokens/themes", () => {
    expect(discoverThemes()).toEqual(["portfolio"]);
  });

  it("includes external default theme in Figma discovery", () => {
    expect(discoverFigmaThemes()).toEqual(["default", "portfolio"]);
  });

  it("discovers semantic modes for default and portfolio", () => {
    expect(discoverSemanticModes("default")).toEqual(["dark", "light"]);
    expect(discoverSemanticModes("portfolio")).toEqual(["portfolio"]);
  });
});
