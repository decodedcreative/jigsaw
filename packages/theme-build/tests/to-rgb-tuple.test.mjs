import assert from "node:assert/strict";
import test from "node:test";
import { toRgbTuple } from "../src/to-rgb-tuple.mjs";

test("toRgbTuple converts 6-digit hex colours", () => {
  assert.equal(toRgbTuple("#627d98"), "98 125 152");
  assert.equal(toRgbTuple("#ff6b1a"), "255 107 26");
});

test("toRgbTuple converts 3-digit hex colours", () => {
  assert.equal(toRgbTuple("#fff"), "255 255 255");
});

test("toRgbTuple handles transparent", () => {
  assert.equal(toRgbTuple("transparent"), "0 0 0");
});
