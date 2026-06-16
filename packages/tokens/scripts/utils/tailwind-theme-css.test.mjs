import { describe, expect, it } from "vitest";

import {
  paletteColorInlineDeclaration,
  tailwindV4ColorInlineRef,
  tokenToThemeDeclaration,
} from "./tailwind-theme-css.mjs";

/** Pure path → CSS custom property mapper tests (not Style Dictionary output). */
describe("tokenToThemeDeclaration", () => {
  it("maps spacing tokens", () => {
    const spacing = tokenToThemeDeclaration(["spacing", "4"], "1rem");
    expect(spacing.name).toBe("--spacing-4");
    expect(spacing.value).toBe("1rem");

    const half = tokenToThemeDeclaration(["spacing", "0.5"], "0.125rem");
    expect(half.name).toBe("--spacing-0.5");
    expect(half.value).toBe("0.125rem");
  });

  it("maps typography tokens", () => {
    const size = tokenToThemeDeclaration(["font", "size", "sm"], "0.875rem");
    expect(size.name).toBe("--text-sm");
    expect(size.value).toBe("0.875rem");

    const leading = tokenToThemeDeclaration(["font", "lineHeight", "tight"], "1.25");
    expect(leading.name).toBe("--leading-tight");
    expect(leading.value).toBe("1.25");
  });

  it("maps radius, shadow, and motion tokens", () => {
    const radius = tokenToThemeDeclaration(["borderRadius", "default"], "0.25rem");
    expect(radius.name).toMatch(/^--radius-/);
    expect(radius.value).toBe("0.25rem");

    const shadow = tokenToThemeDeclaration(["shadow", "default"], "0 4px 6px");
    expect(shadow.name).toBe("--shadow");
    expect(shadow.value).toBe("0 4px 6px");

    const motion = tokenToThemeDeclaration(["motion", "duration", "fast"], "150ms");
    expect(motion.name).toMatch(/^--transition-duration-/);
    expect(motion.value).toBe("150ms");
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
