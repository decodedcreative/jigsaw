import assert from "node:assert/strict";
import test from "node:test";

import { applyAppTheme } from "./apply-app-theme.mjs";

/** @returns {Pick<Element, "setAttribute" | "removeAttribute" | "getAttribute">} */
const mockRoot = () => {
  /** @type {Record<string, string>} */
  const attributes = {};

  return {
    setAttribute(name, value) {
      attributes[name] = value;
    },
    removeAttribute(name) {
      delete attributes[name];
    },
    getAttribute(name) {
      return attributes[name] ?? null;
    },
  };
};

test("applyAppTheme clears data-theme for default light", () => {
  const root = mockRoot();
  root.setAttribute("data-theme", "dark");

  applyAppTheme(root, "light");

  assert.equal(root.getAttribute("data-theme"), null);
});

test("applyAppTheme sets data-theme for dark and portfolio", () => {
  const root = mockRoot();

  applyAppTheme(root, "dark");
  assert.equal(root.getAttribute("data-theme"), "dark");

  applyAppTheme(root, "portfolio");
  assert.equal(root.getAttribute("data-theme"), "portfolio");
});

test("applyAppTheme treats undefined as default light", () => {
  const root = mockRoot();
  root.setAttribute("data-theme", "portfolio");

  applyAppTheme(root, undefined);

  assert.equal(root.getAttribute("data-theme"), null);
});
