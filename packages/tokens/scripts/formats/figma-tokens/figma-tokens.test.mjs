import { describe, expect, it } from "vitest";
import { figmaTokens } from "./index.mjs";

const token = (path, overrides = {}) => ({
  path,
  value: "#336699",
  type: "color",
  ...overrides,
});

const format = (allTokens, options = {}) =>
  JSON.parse(figmaTokens({ dictionary: { allTokens }, options }));

describe("figmaTokens", () => {
  it("builds nested legacy token JSON", () => {
    expect(
      format([
        token(["color", "primary"]),
        token(["spacing", "md"], { value: 16, type: "number" }),
      ]),
    ).toEqual({
      color: { primary: { value: "#336699", type: "color" } },
      spacing: { md: { value: 16, type: "number" } },
    });
  });

  it("preserves source literals from token.original", () => {
    expect(
      format([
        token(["color", "primary"], {
          value: "rgb(51 102 153)",
          original: { value: "#336699", type: "color" },
        }),
      ]),
    ).toEqual({
      color: { primary: { value: "#336699", type: "color" } },
    });
  });

  it("strips the first path segment for mode-scoped exports", () => {
    expect(
      format([token(["light", "color", "primary"])], { stripFirstSegment: true }),
    ).toEqual({
      color: { primary: { value: "#336699", type: "color" } },
    });
  });

  it("strips configured mode prefixes for merged theme exports", () => {
    expect(
      format([token(["portfolio", "color", "primary"])], {
        stripModePrefixes: ["portfolio"],
      }),
    ).toEqual({
      color: { primary: { value: "#336699", type: "color" } },
    });
  });

  it("throws when nesting under an existing token leaf", () => {
    expect(() =>
      format([token(["color", "primary"]), token(["color", "primary", "hover"])]),
    ).toThrow(/cannot nest under an existing token leaf/);
  });

  it("throws when replacing an existing token group", () => {
    expect(() =>
      format([token(["color", "primary", "hover"]), token(["color", "primary"])]),
    ).toThrow(/cannot replace an existing token group/);
  });

  it("appends a trailing newline to output", () => {
    expect(figmaTokens({ dictionary: { allTokens: [] } })).toBe("{}\n");
  });
});
