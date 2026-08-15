import { describe, it, expect } from "vitest";
import { twMerge } from "tailwind-merge";
import { mergeRootClassName } from "./mergeRootClassName";

/** Narrows the string-or-render-prop return type to the function form. */
function asRenderFn<P>(
  value: string | ((values: P) => string)
): (values: P) => string {
  if (typeof value !== "function") {
    throw new Error(`expected a render-prop function, got ${typeof value}`);
  }
  return value;
}

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
    const merged = asRenderFn(
      mergeRootClassName(
        "px-3 rounded-md",
        ({ defaultClassName }) => twMerge("ring-2", defaultClassName),
        twMerge
      )
    );

    expect(merged({ defaultClassName: "data-expanded" })).toBe(
      "px-3 rounded-md ring-2 data-expanded"
    );
  });

  it("preserves slot classes when function className adds state-driven classes", () => {
    const merged = asRenderFn(
      mergeRootClassName<{ defaultClassName?: string; isEntering?: boolean }>(
        "bg-surface-inverse text-foreground-inverse",
        ({ isEntering }) => (isEntering ? "animate-in" : ""),
        twMerge
      )
    );

    expect(merged({ defaultClassName: undefined, isEntering: true })).toBe(
      "bg-surface-inverse text-foreground-inverse animate-in"
    );
    expect(merged({ defaultClassName: undefined, isEntering: false })).toBe(
      "bg-surface-inverse text-foreground-inverse"
    );
  });
});
