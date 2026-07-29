#!/usr/bin/env node
/**
 * Unit tests for Turborepo / Changesets package discovery helpers.
 */
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  applyFixedGroups,
  parseJsonFromMixedStdout,
  selectChangedPackageNames,
  selectPublishablePackages,
} from "./publishable-packages.mjs";

describe("parseJsonFromMixedStdout", () => {
  it("skips turbo banner lines before JSON", () => {
    const parsed = parseJsonFromMixedStdout(
      "• turbo 2.9.16\n{\"packages\":{\"items\":[]}}\n"
    );
    assert.deepEqual(parsed, { packages: { items: [] } });
  });
});

describe("selectPublishablePackages", () => {
  it("orders longer path prefixes first", () => {
    const packages = selectPublishablePackages(
      [
        { name: "@jigsaw-ds/tokens", path: "packages/tokens" },
        { name: "@jigsaw-ds/theme-default", path: "packages/themes/default" },
      ],
      { ignore: [], isPrivate: () => false }
    );
    assert.equal(packages[0].name, "@jigsaw-ds/theme-default");
  });
});

describe("selectChangedPackageNames + applyFixedGroups", () => {
  it("filters turbo dry-run output then applies fixed groups", () => {
    const changed = selectChangedPackageNames(
      ["//", "@jigsaw-ds/design-system", "web"],
      ["@jigsaw-ds/design-system", "@jigsaw-ds/tokens", "@jigsaw-ds/theme-build"]
    );
    const withFixed = applyFixedGroups(changed, [
      ["@jigsaw-ds/design-system", "@jigsaw-ds/tokens"],
    ]);
    assert.deepEqual(
      [...withFixed].sort(),
      ["@jigsaw-ds/design-system", "@jigsaw-ds/tokens"].sort()
    );
  });
});
