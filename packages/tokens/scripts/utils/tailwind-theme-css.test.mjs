import { describe, expect, it } from "vitest";

import {
  paletteColorInlineDeclaration,
  tailwindV4ColorInlineRef,
  tokenToThemeDeclaration,
} from "./tailwind-theme-css.mjs";

describe("tokenToThemeDeclaration", () => {
  it("maps spacing tokens", () => {
    expect(tokenToThemeDeclaration(["spacing", "4"], "1rem")).toEqual({
      name: "--spacing-4",
      value: "1rem",
    });
    expect(tokenToThemeDeclaration(["spacing", "0.5"], "0.125rem")).toEqual({
      name: "--spacing-0.5",
      value: "0.125rem",
    });
  });

  it("maps typography tokens", () => {
    expect(tokenToThemeDeclaration(["font", "size", "sm"], "0.875rem")).toEqual({
      name: "--text-sm",
      value: "0.875rem",
    });
    expect(tokenToThemeDeclaration(["font", "lineHeight", "tight"], "1.25")).toEqual({
      name: "--leading-tight",
      value: "1.25",
    });
  });

  it("maps radius, shadow, and motion tokens", () => {
    expect(tokenToThemeDeclaration(["borderRadius", "default"], "0.25rem")).toEqual({
      name: "--radius-default",
      value: "0.25rem",
    });
    expect(tokenToThemeDeclaration(["shadow", "default"], "0 4px 6px")).toEqual({
      name: "--shadow",
      value: "0 4px 6px",
    });
    expect(tokenToThemeDeclaration(["motion", "duration", "fast"], "150ms")).toEqual({
      name: "--transition-duration-fast",
      value: "150ms",
    });
  });
});

describe("paletteColorInlineDeclaration", () => {
  it("references runtime palette CSS variables", () => {
    expect(paletteColorInlineDeclaration(["color", "navy", "500"])).toEqual({
      name: "--color-navy-500",
      value: "rgb(var(--color-navy-500))",
    });
  });
});

describe("tailwindV4ColorInlineRef", () => {
  it("wraps semantic colour vars for opacity modifiers", () => {
    expect(tailwindV4ColorInlineRef("interactive-accent")).toBe(
      "rgb(var(--color-interactive-accent))",
    );
  });
});
