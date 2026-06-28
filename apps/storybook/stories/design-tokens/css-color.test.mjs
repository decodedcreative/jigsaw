import assert from "node:assert/strict";
import test from "node:test";

import {
  formatCssRgbTupleForDisplay,
  readCssVariableColor,
} from "@jigsaw-ds/tokens/css-color";

test("formatCssRgbTupleForDisplay rejects malformed tuples", () => {
  assert.equal(formatCssRgbTupleForDisplay(""), "");
  assert.equal(formatCssRgbTupleForDisplay("255"), "");
  assert.equal(formatCssRgbTupleForDisplay("#ffffff"), "");
});

test("readCssVariableColor returns descriptive label when CSS variable is unset", () => {
  assert.equal(
    readCssVariableColor("--color-missing", () => ""),
    "--color-missing unset",
  );
});

test("readCssVariableColor formats resolved CSS variable values", () => {
  assert.equal(
    readCssVariableColor("--color-navy-500", () => "1 2 3"),
    "rgb(1 2 3)",
  );
});
