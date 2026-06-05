import { describe, it, expect } from "vitest";
import { twMerge } from "tailwind-merge";
import { mergeRootClassName } from "./mergeRootClassName";

describe("mergeRootClassName", () => {
  it("returns slot classes when className is undefined", () => {
    expect(mergeRootClassName("px-3 rounded-md", undefined, twMerge)).toBe("px-3 rounded-md");
  });

  it("merges string className with slot classes", () => {
    expect(mergeRootClassName("px-3 rounded-md", "ring-2 ring-brand-primary", twMerge)).toBe(
      "px-3 rounded-md ring-2 ring-brand-primary"
    );
  });

  it("lets string className override conflicting utilities from slot classes", () => {
    expect(mergeRootClassName("px-3 rounded-md", "px-6", twMerge)).toBe("rounded-md px-6");
  });

  it("composes function className with slot classes and defaultClassName", () => {
    const merged = mergeRootClassName(
      "px-3 rounded-md",
      ({ defaultClassName }) => twMerge("ring-2", defaultClassName),
      twMerge
    );

    expect(typeof merged).toBe("function");
    expect(merged({ defaultClassName: "data-expanded" })).toBe(
      "px-3 rounded-md ring-2 data-expanded"
    );
  });

  it("preserves slot classes when function className adds state-driven classes", () => {
    const merged = mergeRootClassName(
      "bg-surface-inverse text-foreground-inverse",
      ({ isEntering }) => (isEntering ? "animate-in" : ""),
      twMerge
    );

    expect(typeof merged).toBe("function");
    expect(merged({ defaultClassName: undefined, isEntering: true })).toBe(
      "bg-surface-inverse text-foreground-inverse animate-in"
    );
    expect(merged({ defaultClassName: undefined, isEntering: false })).toBe(
      "bg-surface-inverse text-foreground-inverse"
    );
  });
});
