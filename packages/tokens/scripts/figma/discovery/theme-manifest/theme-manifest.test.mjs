import { describe, expect, it } from "vitest";
import {
  sourceTokenSets,
  stableThemeId,
  themeDisplayName,
  themeGroup,
} from "./index.mjs";

describe("theme-manifest helpers", () => {
  it("stableThemeId is deterministic", () => {
    expect(stableThemeId("Default Light")).toBe(stableThemeId("Default Light"));
    expect(stableThemeId("Default Light")).not.toBe(stableThemeId("Default Dark"));
  });

  it("themeDisplayName capitalizes theme and mode", () => {
    expect(themeDisplayName("default", "light")).toBe("Default Light");
  });

  it("themeGroup uses Theme for merged portfolio export", () => {
    expect(themeGroup("portfolio", ["portfolio"])).toBe("Theme");
    expect(themeGroup("default", ["light", "dark"])).toBe("Default");
  });

  it("sourceTokenSets includes shared and optional base", () => {
    expect(sourceTokenSets("default", false)).toEqual({ "shared.tokens": "source" });
    expect(sourceTokenSets("default", true)).toEqual({
      "shared.tokens": "source",
      "default-base.tokens": "source",
    });
  });
});
