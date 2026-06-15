import assert from "node:assert/strict";
import test from "node:test";

import {
  formatCssRgbTupleForDisplay,
  readCssVariableColor,
} from "../../../../packages/tokens/scripts/utils/tailwind-theme-color.mjs";

test("formatCssRgbTupleForDisplay rejects malformed tuples", () => {
  assert.equal(formatCssRgbTupleForDisplay(""), "");
  assert.equal(formatCssRgbTupleForDisplay("255"), "");
  assert.equal(formatCssRgbTupleForDisplay("#ffffff"), "");
});

test("readCssVariableColor returns empty when CSS variable is unset", () => {
  assert.equal(readCssVariableColor("--color-missing", () => ""), "");
});

test("readCssVariableColor formats resolved CSS variable values", () => {
  assert.equal(
    readCssVariableColor("--color-navy-500", () => "1 2 3"),
    "rgb(1 2 3)",
  );
});
