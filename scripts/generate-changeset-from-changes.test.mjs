import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  applyFixedGroups,
  selectChangedPackageNames,
  selectPublishablePackages,
} from "./lib/publishable-packages.mjs";
import {
  buildChangesetMarkdown,
  changesetFileName,
  chooseSinceRef,
  parseBump,
  planChangeset,
} from "./generate-changeset-from-changes.mjs";

describe("selectPublishablePackages", () => {
  const turboItems = [
    { name: "@jigsaw-ds/design-system", path: "packages/design-system" },
    { name: "@jigsaw-ds/storybook", path: "apps/storybook" },
    { name: "@jigsaw-ds/theme-default", path: "packages/themes/default" },
    { name: "@jigsaw-ds/tokens", path: "packages/tokens" },
    { name: "web", path: "apps/web" },
  ];

  it("keeps non-private packages and drops changeset ignore + private", () => {
    const privatePaths = new Set(["apps/storybook", "apps/web"]);
    const packages = selectPublishablePackages(turboItems, {
      ignore: ["@jigsaw-ds/storybook", "web"],
      isPrivate: (packageRel) => privatePaths.has(packageRel),
    });

    assert.deepEqual(
      packages.map((pkg) => pkg.name),
      [
        // longest prefix first
        "@jigsaw-ds/theme-default",
        "@jigsaw-ds/design-system",
        "@jigsaw-ds/tokens",
      ]
    );
    assert.equal(packages[0].prefix, "packages/themes/default/");
  });
});

describe("selectChangedPackageNames", () => {
  it("drops root and non-publishable dependents", () => {
    const changed = selectChangedPackageNames(
      ["//", "@jigsaw-ds/design-system", "@jigsaw-ds/storybook", "web"],
      ["@jigsaw-ds/design-system", "@jigsaw-ds/tokens"]
    );
    assert.deepEqual([...changed], ["@jigsaw-ds/design-system"]);
  });
});

describe("applyFixedGroups", () => {
  it("pulls fixed peers in when any member changed", () => {
    assert.deepEqual(
      [
        ...applyFixedGroups(new Set(["@jigsaw-ds/design-system"]), [
          ["@jigsaw-ds/design-system", "@jigsaw-ds/tokens"],
        ]),
      ].sort(),
      ["@jigsaw-ds/design-system", "@jigsaw-ds/tokens"].sort()
    );
  });
});

describe("parseBump", () => {
  it("defaults to patch and validates", () => {
    assert.equal(parseBump(undefined), "patch");
    assert.equal(parseBump("MINOR"), "minor");
    assert.throws(() => parseBump("banana"), /Invalid --bump/);
  });
});

describe("planChangeset", () => {
  it("returns null when nothing changed", () => {
    assert.equal(
      planChangeset({
        sinceRef: "v0.1.0",
        packageNames: new Set(),
        commitSubjects: [],
        bump: "patch",
      }),
      null
    );
  });

  it("uses explicit bump and commit subjects for summary", () => {
    const plan = planChangeset({
      sinceRef: "v0.1.0",
      packageNames: new Set([
        "@jigsaw-ds/design-system",
        "@jigsaw-ds/tokens",
      ]),
      commitSubjects: [
        "feat(design-system): preserve per-module use client boundaries (JSW-111) (#68)",
        "totally unstructured commit message",
        "",
      ],
      bump: "patch",
    });

    assert.ok(plan);
    assert.equal(plan.bump, "patch");
    assert.match(plan.markdown, /"@jigsaw-ds\/design-system": patch/);
    assert.match(plan.markdown, /preserve per-module use client boundaries/);
    assert.match(plan.markdown, /preserve per-module use client boundaries/);
    assert.match(plan.markdown, /totally unstructured commit message/);
    assert.equal(plan.fileName, changesetFileName(plan.markdown));
  });

  it("lists only the packages passed in (fixed peers are not implied)", () => {
    const plan = planChangeset({
      sinceRef: "v0.1.0",
      packageNames: new Set(["@jigsaw-ds/design-system"]),
      commitSubjects: ["fix: make ESM Node-resolvable (JSW-115)"],
      bump: "patch",
    });

    assert.ok(plan);
    assert.match(plan.markdown, /"@jigsaw-ds\/design-system": patch/);
    assert.doesNotMatch(plan.markdown, /"@jigsaw-ds\/tokens":/);
    assert.match(plan.markdown, /^fix: make ESM Node-resolvable/m);
  });
});

describe("chooseSinceRef", () => {
  it("prefers the newer of tag vs version commit", () => {
    assert.equal(
      chooseSinceRef({
        tag: "v0.1.0",
        versionCommit: "abc",
        tagTime: 100,
        commitTime: 200,
      }),
      "abc"
    );
    assert.equal(
      chooseSinceRef({
        tag: "v0.1.0",
        versionCommit: "abc",
        tagTime: 300,
        commitTime: 200,
      }),
      "v0.1.0"
    );
  });

  it("falls back to whichever baseline exists", () => {
    assert.equal(
      chooseSinceRef({ tag: "v0.1.0", versionCommit: "" }),
      "v0.1.0"
    );
    assert.equal(
      chooseSinceRef({ tag: "", versionCommit: "abc" }),
      "abc"
    );
  });

  it("errors with bootstrap guidance when neither baseline exists", () => {
    assert.throws(
      () => chooseSinceRef({ tag: "", versionCommit: "" }),
      /Cannot determine a release baseline[\s\S]*--since/
    );
  });
});

describe("buildChangesetMarkdown", () => {
  it("emits valid frontmatter", () => {
    const md = buildChangesetMarkdown({
      packages: new Set(["@jigsaw-ds/theme-build"]),
      bump: "patch",
      summaryLines: ["chore: tweak build helper"],
    });
    assert.equal(
      md,
      `---
"@jigsaw-ds/theme-build": patch
---

chore: tweak build helper
`
    );
  });
});
