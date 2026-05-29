import { describe, it, expect } from "vitest";
import { isClickable } from "./isClickable";

describe("isClickable", () => {
  it("returns true when an onClick handler is provided", () => {
    expect(isClickable({ as: "div", onClick: () => {} })).toBe(true);
  });

  it("returns true for an anchor with an href", () => {
    expect(isClickable({ as: "a", href: "/path" })).toBe(true);
  });

  it("returns false for an anchor without an href", () => {
    expect(isClickable({ as: "a" })).toBe(false);
    expect(isClickable({ as: "a", href: "" })).toBe(false);
  });

  it("returns false for a non-anchor with an href but no onClick", () => {
    expect(isClickable({ as: "div", href: "/path" })).toBe(false);
  });

  it("returns false with no interactive signals", () => {
    expect(isClickable({})).toBe(false);
    expect(isClickable({ as: "button" })).toBe(false);
  });
});
