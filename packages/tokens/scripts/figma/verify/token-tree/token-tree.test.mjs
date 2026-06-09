import { describe, expect, it } from "vitest";
import { validateTokenTree } from "./index.mjs";

describe("validateTokenTree", () => {
  it("accepts valid nested tokens", () => {
    const result = validateTokenTree({
      color: {
        primary: { value: "#336699", type: "color" },
      },
      spacing: {
        md: { value: 16, type: "number" },
      },
    });

    expect(result.errors).toEqual([]);
    expect(result.tokenCount).toBe(2);
  });

  it("rejects CSS-transformed color values", () => {
    const result = validateTokenTree({
      color: { primary: { value: "rgb(51, 102, 153)", type: "color" } },
    });

    expect(result.errors).toHaveLength(1);
    expect(result.errors[0]).toContain("CSS-transformed");
  });

  it("rejects leaves missing value or type", () => {
    const result = validateTokenTree({
      color: { primary: { value: "#336699" } },
    });

    expect(result.errors[0]).toContain('"value" and "type"');
  });
});
