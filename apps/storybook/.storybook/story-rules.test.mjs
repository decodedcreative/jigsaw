import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import path from "node:path";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";
import { checkStoryFile, LAYOUT_CLASS } from "./story-rules.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../..");

function storyFiles() {
  const out = execFileSync("git", ["ls-files", "*.stories.tsx"], { cwd: repoRoot, encoding: "utf8" });
  return out.split("\n").filter(Boolean).map((f) => path.join(repoRoot, f));
}

describe("story rules (JSW-134)", () => {
  it("every story file passes", () => {
    const files = storyFiles();
    assert.ok(files.length > 20, `expected story files, found ${files.length}`);
    const problems = files.flatMap((file) => checkStoryFile(file).map((p) => path.relative(repoRoot, p)));
    assert.deepEqual(problems, [], `\n${problems.join("\n")}`);
  });
});

describe("rule 1: Show code is copy-pasteable", () => {
  const ds = path.join(repoRoot, "packages/design-system/src/components/x/X.stories.tsx");

  it("flags a story rendering a helper defined in the file", () => {
    const src = `
      import { Checkbox } from "./index";
      function Controlled() { return <Checkbox />; }
      export default { title: "X" };
      export const A = { render: () => <Controlled /> };`;
    assert.equal(checkStoryFile(ds, src).length, 1);
  });

  it("allows it when the story sets docs.source.code, or hides the code panel", () => {
    const src = `
      import { Checkbox } from "./index";
      function Controlled() { return <Checkbox />; }
      export default { title: "X" };
      export const A = { render: () => <Controlled />, parameters: { docs: { source: { code: "<Checkbox />" } } } };
      export const B = { render: () => <Controlled />, parameters: { docs: { codePanel: false } } };`;
    assert.deepEqual(checkStoryFile(ds, src), []);
  });

  it("honours the meta's docs settings for every story", () => {
    const src = `
      import { Swatch } from "./_components";
      const meta = { title: "X", parameters: { docs: { codePanel: false } } };
      export default meta;
      export const A = { render: () => <Swatch /> };`;
    assert.deepEqual(checkStoryFile(ds, src), []);
  });

  it("treats design-system component imports as real usage, and story-only modules as helpers", () => {
    const src = `
      import { Button } from "../button/Button";
      import { styles } from "./X.stories.styles";
      import { Frame } from "./X.stories.helpers";
      export default { title: "X" };
      export const A = { render: () => <Button>Save</Button> };
      export const B = { render: () => <Frame />, };`;
    const problems = checkStoryFile(ds, src);
    assert.equal(problems.length, 1);
    assert.match(problems[0], /story "B"/);
  });

  it("treats any relative import in apps/storybook as a helper", () => {
    const app = path.join(repoRoot, "apps/storybook/stories/examples/x/X.stories.tsx");
    const src = `
      import { Button } from "@jigsaw-ds/design-system";
      import { ProfileTab } from "./components/ProfileTab";
      export default { title: "X" };
      export const A = { render: () => <><Button>Save</Button><ProfileTab /></> };`;
    assert.match(checkStoryFile(app, src)[0], /<ProfileTab>/);
  });
});

describe("rule 2: no layout on Text or Heading", () => {
  const file = path.join(repoRoot, "packages/design-system/src/components/x/X.stories.tsx");

  it("flags layout utilities in className or classNameOverrides", () => {
    const src = `
      import { Text, H2 } from "./index";
      export default { title: "X" };
      export const A = { render: () => <>
        <Text className="flex gap-2">One</Text>
        <H2 classNameOverrides={{ component: "md:grid" }}>Two</H2>
      </> };`;
    const problems = checkStoryFile(file, src);
    assert.equal(problems.length, 2);
    assert.match(problems[0], /"flex"/);
    assert.match(problems[1], /"md:grid"/);
  });

  it("allows non-layout classes, and layout on other components", () => {
    const src = `
      import { Text, Card } from "./index";
      export default { title: "X" };
      export const A = { render: () => <Card classNameOverrides={{ content: "flex gap-2" }}>
        <Text className="text-foreground-muted mt-2 truncate">One</Text>
      </Card> };`;
    assert.deepEqual(checkStoryFile(file, src), []);
  });

  it("matches whole utilities only", () => {
    for (const cls of ["flex", "inline-flex", "gap-4", "gap-x-2", "items-center", "justify-between", "md:flex", "space-y-2", "grid-cols-3", "flex-col"]) {
      assert.match(` ${cls} `, LAYOUT_CLASS, cls);
    }
    for (const cls of ["flex-shrink-0", "text-flex", "flexible", "truncate", "font-semibold", "items"]) {
      assert.doesNotMatch(` ${cls} `, LAYOUT_CLASS, cls);
    }
  });
});
