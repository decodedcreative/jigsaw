import { describe, it, expect, afterEach } from "vitest";
import { twMerge } from "tailwind-merge";
import { mergeClassName } from "./mergeClassName";
import { configureTwMerge, resetThemeConfig } from "../theme/config";

afterEach(() => {
  resetThemeConfig();
});

describe("mergeClassName", () => {
  it("returns slot classes unchanged when className is undefined", () => {
    expect(mergeClassName("px-3 rounded-md", undefined, twMerge)).toBe("px-3 rounded-md");
  });

  it("returns slot classes unchanged when className is empty", () => {
    expect(mergeClassName("px-3 rounded-md", "", twMerge)).toBe("px-3 rounded-md");
  });

  it("appends non-conflicting consumer classes", () => {
    expect(mergeClassName("px-3 rounded-md", "mt-4 col-span-2", twMerge)).toBe(
      "px-3 rounded-md mt-4 col-span-2"
    );
  });

  it("lets consumer classes win conflicting utilities", () => {
    expect(mergeClassName("px-3 rounded-md", "px-6", twMerge)).toBe("rounded-md px-6");
  });

  it("uses the module-level merge from configureTwMerge by default", () => {
    configureTwMerge((...classes) => `custom:${classes.filter(Boolean).join("|")}`);
    expect(mergeClassName("px-3", "mt-4")).toBe("custom:px-3|mt-4");
  });
});
