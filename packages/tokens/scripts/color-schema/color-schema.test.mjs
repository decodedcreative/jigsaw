import { describe, expect, it } from "vitest";
import theme from "../../dist/theme.mjs";

describe("color-schema", () => {
  it("emits CSS variable refs for palette tokens, not literal hex", () => {
    expect(theme.color.navy["500"]).toBe(
      "rgb(var(--color-navy-500) / <alpha-value>)",
    );
    expect(theme.color.orange["500"]).toBe(
      "rgb(var(--color-orange-500) / <alpha-value>)",
    );
    expect(JSON.stringify(theme.color)).not.toMatch(/#[0-9a-f]{3,8}/i);
  });
});
