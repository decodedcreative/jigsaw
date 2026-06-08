import { describe, expect, it } from "vitest";
import { jsonEquals } from "./index.mjs";

describe("jsonEquals", () => {
  it("compares deep structure via JSON serialization", () => {
    expect(jsonEquals({ a: [1, 2] }, { a: [1, 2] })).toBe(true);
    expect(jsonEquals({ a: 1 }, { a: 2 })).toBe(false);
  });
});
