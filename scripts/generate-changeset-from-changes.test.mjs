import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  applyFixedGroup,
  buildChangesetMarkdown,
  changesetFileName,
  packagesForChangedFiles,
  parseBump,
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

  it("prefers theme package prefixes over broader paths", () => {
    const packages = packagesForChangedFiles([
      "packages/themes/default/src/index.ts",
      "packages/themes/portfolio/src/index.ts",
    ]);
    assert.deepEqual(
      [...packages].sort(),
      ["@jigsaw-ds/theme-default", "@jigsaw-ds/theme-portfolio"].sort()
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

describe("parseBump", () => {
  it("defaults to patch", () => {
    assert.equal(parseBump(undefined), "patch");
  });

  it("accepts patch minor major", () => {
    assert.equal(parseBump("minor"), "minor");
    assert.equal(parseBump("MAJOR"), "major");
  });

  it("rejects invalid values", () => {
    assert.throws(() => parseBump("banana"), /Invalid --bump/);
  });
});

describe("planChangeset", () => {
  it("returns null when no publishable packages changed", () => {
    assert.equal(
      planChangeset({
        sinceRef: "v0.1.0",
        files: ["docs/publication.md"],
        commitSubjects: ["docs: update publication"],
        bump: "patch",
      }),
      null
    );
  });

  it("uses the explicit bump even when commit subjects look like feat", () => {
    const plan = planChangeset({
      sinceRef: "v0.1.0",
      files: ["packages/design-system/src/hooks/useGetClassNames.ts"],
      commitSubjects: [
        "feat(design-system): preserve per-module use client boundaries (JSW-111) (#68)",
        "totally unstructured commit message",
        "",
      ],
      bump: "patch",
    });

    assert.ok(plan);
    assert.equal(plan.bump, "patch");
    assert.deepEqual(plan.packages, [
      "@jigsaw-ds/design-system",
      "@jigsaw-ds/tokens",
    ]);
    assert.match(plan.markdown, /"@jigsaw-ds\/design-system": patch/);
    assert.match(plan.markdown, /preserve per-module use client boundaries/);
    assert.match(plan.markdown, /totally unstructured commit message/);
    assert.equal(plan.fileName, changesetFileName(plan.markdown));
    assert.match(plan.fileName, /^auto-[a-f0-9]{8}\.md$/);
  });

  it("honours minor and major bumps", () => {
    const minor = planChangeset({
      sinceRef: "v0.1.0",
      files: ["packages/theme-build/src/index.ts"],
      commitSubjects: ["update build helper"],
      bump: "minor",
    });
    assert.equal(minor.bump, "minor");

    const major = planChangeset({
      sinceRef: "v0.1.0",
      files: ["packages/theme-build/src/index.ts"],
      commitSubjects: [],
      bump: "major",
    });
    assert.equal(major.bump, "major");
    assert.match(major.markdown, /Automated changeset/);
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
