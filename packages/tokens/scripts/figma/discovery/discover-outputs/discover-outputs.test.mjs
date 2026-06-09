import { describe, expect, it } from "vitest";
import { discoverFigmaFilenames, discoverFigmaTokenSetOrder } from "./index.mjs";

describe("discoverFigmaOutputs", () => {
  it("discovers expected token files for current themes", () => {
    expect(discoverFigmaFilenames()).toEqual([
      "shared.tokens.json",
      "default-base.tokens.json",
      "default-light.tokens.json",
      "default-dark.tokens.json",
      "portfolio.tokens.json",
    ]);
  });

  it("orders light before dark in metadata token set order", () => {
    const order = discoverFigmaTokenSetOrder();
    const lightIndex = order.indexOf("default-light.tokens");
    const darkIndex = order.indexOf("default-dark.tokens");
    expect(lightIndex).toBeGreaterThan(-1);
    expect(darkIndex).toBeGreaterThan(lightIndex);
  });
});
