import { describe, expect, it } from "vitest";

import { formatCssRgbTupleForDisplay, readCssVariableColor } from "./css-color";

describe("formatCssRgbTupleForDisplay", () => {
  it("formats valid RGB tuples", () => {
    expect(formatCssRgbTupleForDisplay("12 34 56")).toBe("rgb(12 34 56)");
  });

  it("returns empty for missing or malformed values", () => {
    expect(formatCssRgbTupleForDisplay("")).toBe("");
    expect(formatCssRgbTupleForDisplay("  ")).toBe("");
    expect(formatCssRgbTupleForDisplay("#ff00aa")).toBe("");
    expect(formatCssRgbTupleForDisplay("12 34")).toBe("");
  });
});

describe("readCssVariableColor", () => {
  it("reads and formats CSS variable values", () => {
    const value = readCssVariableColor("--color-navy-500", (name) =>
      name === "--color-navy-500" ? "10 20 30" : "",
    );
    expect(value).toBe("rgb(10 20 30)");
  });

  it("returns descriptive labels when the variable is unset or invalid", () => {
    expect(readCssVariableColor("--color-navy-500", () => "")).toBe(
      "--color-navy-500 unset",
    );
    expect(readCssVariableColor("--color-navy-500", () => "not-rgb")).toBe(
      "--color-navy-500 malformed",
    );
    expect(readCssVariableColor("color-navy-500", () => "10 20 30")).toBe(
      "invalid css var",
    );
  });
});
