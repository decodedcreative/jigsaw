import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  applyFixedGroup,
  buildChangesetMarkdown,
  changesetFileName,
  inferBumpType,
  packagesForChangedFiles,
  planChangeset,
  shouldIgnoreChangedFile,
} from "./generate-changeset-from-changes.mjs";

describe("packagesForChangedFiles", () => {
  it("maps package paths to package names", () => {
    const packages = packagesForChangedFiles([
      "packages/design-system/src/index.ts",
      "packages/tokens/src/index.ts",
      "packages/themes/default/dist/css/base.css",
      "docs/publication.md",
      "apps/web/src/app/page.tsx",
    ]);
    assert.deepEqual(
      [...packages].sort(),
      [
        "@jigsaw-ds/design-system",
        "@jigsaw-ds/theme-default",
        "@jigsaw-ds/tokens",
      ].sort()
    );
  });

  it("ignores changelog and test files", () => {
    assert.equal(
      shouldIgnoreChangedFile("packages/design-system/CHANGELOG.md"),
      true
    );
    assert.equal(
      shouldIgnoreChangedFile("packages/design-system/src/Button.test.tsx"),
      true
    );
    const packages = packagesForChangedFiles([
      "packages/design-system/CHANGELOG.md",
      "packages/design-system/src/Button.test.tsx",
    ]);
    assert.equal(packages.size, 0);
  });
});

describe("applyFixedGroup", () => {
  it("pulls design-system and tokens together", () => {
    assert.deepEqual(
      [...applyFixedGroup(new Set(["@jigsaw-ds/design-system"]))].sort(),
      ["@jigsaw-ds/design-system", "@jigsaw-ds/tokens"].sort()
    );
  });
});

describe("inferBumpType", () => {
  it("defaults to patch", () => {
    assert.equal(inferBumpType(["fix: button padding"]), "patch");
  });

  it("uses minor for feat", () => {
    assert.equal(inferBumpType(["feat(design-system): add Badge"]), "minor");
  });

  it("uses major for breaking marker", () => {
    assert.equal(inferBumpType(["feat!: rename API"]), "major");
    assert.equal(
      inferBumpType(["feat: rename"], ["BREAKING CHANGE: props renamed"]),
      "major"
    );
  });

  it("takes the highest bump across commits", () => {
    assert.equal(
      inferBumpType(["fix: typo", "feat: new thing", "chore: lint"]),
      "minor"
    );
  });
});

describe("planChangeset", () => {
  it("returns null when no publishable packages changed", () => {
    assert.equal(
      planChangeset({
        sinceRef: "v0.1.0",
        files: ["docs/publication.md"],
        commitSubjects: ["docs: update publication"],
        commitBodies: [],
      }),
      null
    );
  });

  it("builds markdown for package changes", () => {
    const plan = planChangeset({
      sinceRef: "v0.1.0",
      files: ["packages/design-system/src/hooks/useGetClassNames.ts"],
      commitSubjects: [
        "feat(design-system): preserve per-module use client boundaries (JSW-111) (#68)",
      ],
      commitBodies: [],
    });

    assert.ok(plan);
    assert.equal(plan.bump, "minor");
    assert.deepEqual(plan.packages, [
      "@jigsaw-ds/design-system",
      "@jigsaw-ds/tokens",
    ]);
    assert.match(plan.markdown, /"@jigsaw-ds\/design-system": minor/);
    assert.match(plan.markdown, /"@jigsaw-ds\/tokens": minor/);
    assert.match(plan.markdown, /preserve per-module use client boundaries/);
    assert.equal(plan.fileName, changesetFileName(plan.markdown));
    assert.match(plan.fileName, /^auto-[a-f0-9]{8}\.md$/);
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

- chore: tweak build helper
`
    );
  });
});
