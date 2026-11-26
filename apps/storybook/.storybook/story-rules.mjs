/**
 * Static rules for story files (JSW-134), checked by story-rules.test.mjs.
 *
 * 1. "Show code" must be copy-pasteable. A story whose render uses a local
 *    helper (a component defined in the story file, or imported from a
 *    story-only module) shows that helper's name instead of real Jigsaw usage,
 *    so it must set `parameters.docs.source.code`, or hide the code panel
 *    with `parameters.docs.codePanel: false` (e.g. token documentation and
 *    full-page examples, which have no single snippet to copy).
 * 2. No layout classes on Text or Heading. Layout belongs on a wrapper.
 */
import { readFileSync } from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const ts = require("typescript");

/** Layout utilities that must not go on Text / Heading. */
export const LAYOUT_CLASS =
  /(?:^|\s)!?(?:[a-z0-9-]+:)*(?:flex|inline-flex|grid|inline-grid|gap(?:-[xy])?-\S+|space-[xy]-\S+|items-\S+|justify-\S+|place-\S+|content-(?:start|end|center|between|around|evenly|stretch|normal)|self-\S+|order-\S+|col-span-\S+|row-span-\S+|grid-(?:cols|rows)-\S+|flex-(?:row|col|wrap|nowrap|1|auto|initial|none)(?:-reverse)?)(?=\s|$)/;
const TEXT_COMPONENTS = /^(?:Text|Heading|H[1-6])$/;

/** Is a relative import (resolved from `file`) a Jigsaw component, or a story-only helper? */
function isHelperModule(file, specifier) {
  if (!specifier.startsWith(".")) return false; // packages, incl. @jigsaw-ds/design-system
  const resolved = path.resolve(path.dirname(file), specifier).replace(/\\/g, "/");
  // Inside the design-system package, relative imports of component modules are
  // real Jigsaw components; story-only modules (e.g. *.stories.styles) are not.
  const inDesignSystem = resolved.includes("/packages/design-system/src/");
  return !inDesignSystem || /\.stories(?:\.|$)/.test(resolved) || /\/_components(?:\/|$)/.test(resolved);
}

function propertyNamed(objectLiteral, name) {
  return objectLiteral?.properties.find(
    (p) => ts.isPropertyAssignment(p) && (p.name.getText() === name || p.name.getText() === `"${name}"`)
  );
}

/** Follow an identifier to its `const x = { … }` initializer in the same file. */
function resolveObject(node, sourceFile) {
  if (!node) return undefined;
  if (ts.isObjectLiteralExpression(node)) return node;
  if (ts.isAsExpression(node) || ts.isSatisfiesExpression(node) || ts.isParenthesizedExpression(node)) {
    return resolveObject(node.expression, sourceFile);
  }
  if (ts.isIdentifier(node)) {
    for (const st of sourceFile.statements) {
      if (!ts.isVariableStatement(st)) continue;
      for (const d of st.declarationList.declarations) {
        if (ts.isIdentifier(d.name) && d.name.text === node.text) return resolveObject(d.initializer, sourceFile);
      }
    }
  }
  return undefined;
}

/** Does a story/meta object set docs.source.code, or turn docs.codePanel off? */
function setsSourceOrHidesCode(objectLiteral, sourceFile) {
  const parameters = resolveObject(propertyNamed(objectLiteral, "parameters")?.initializer, sourceFile);
  const docs = resolveObject(propertyNamed(parameters, "docs")?.initializer, sourceFile);
  if (!docs) return false;
  const codePanel = propertyNamed(docs, "codePanel")?.initializer;
  if (codePanel && codePanel.kind === ts.SyntaxKind.FalseKeyword) return true;
  const source = resolveObject(propertyNamed(docs, "source")?.initializer, sourceFile);
  return Boolean(propertyNamed(source, "code"));
}

function lineOf(sourceFile, node) {
  return sourceFile.getLineAndCharacterOfPosition(node.getStart(sourceFile)).line + 1;
}

/** Check one story file. Returns a list of human-readable problems. */
export function checkStoryFile(file, source = readFileSync(file, "utf8")) {
  const sourceFile = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const problems = [];

  // Components a render could use that aren't real Jigsaw usage.
  const helpers = new Set();
  for (const st of sourceFile.statements) {
    if (ts.isImportDeclaration(st) && st.importClause && isHelperModule(file, st.moduleSpecifier.text)) {
      const { name, namedBindings } = st.importClause;
      if (name) helpers.add(name.text);
      if (namedBindings && ts.isNamedImports(namedBindings)) {
        for (const el of namedBindings.elements) if (/^[A-Z]/.test(el.name.text)) helpers.add(el.name.text);
      }
    }
    if (ts.isFunctionDeclaration(st) && st.name && /^[A-Z]/.test(st.name.text)) helpers.add(st.name.text);
    if (ts.isVariableStatement(st)) {
      for (const d of st.declarationList.declarations) {
        const init = d.initializer;
        if (ts.isIdentifier(d.name) && /^[A-Z]/.test(d.name.text) && init && (ts.isArrowFunction(init) || ts.isFunctionExpression(init))) {
          helpers.add(d.name.text);
        }
      }
    }
  }

  /** Helper tags used inside a node (a render function). */
  const helperTagsIn = (node) => {
    const found = new Set();
    const visit = (n) => {
      if (ts.isJsxOpeningElement(n) || ts.isJsxSelfClosingElement(n)) {
        const base = n.tagName.getText(sourceFile).split(".")[0];
        if (helpers.has(base)) found.add(n.tagName.getText(sourceFile));
      }
      ts.forEachChild(n, visit);
    };
    visit(node);
    return [...found];
  };

  // Meta (default export) settings apply to every story in the file.
  const defaultExport = sourceFile.statements.find(ts.isExportAssignment);
  const meta = resolveObject(defaultExport?.expression, sourceFile);
  const metaSetsSource = meta ? setsSourceOrHidesCode(meta, sourceFile) : false;
  const metaRender = meta && propertyNamed(meta, "render");

  // Rule 1: every exported story object.
  for (const st of sourceFile.statements) {
    if (!ts.isVariableStatement(st) || !st.modifiers?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword)) continue;
    for (const d of st.declarationList.declarations) {
      const story = resolveObject(d.initializer, sourceFile);
      if (!story || !ts.isIdentifier(d.name)) continue;
      const render = propertyNamed(story, "render") ?? metaRender;
      if (!render) continue;
      const tags = helperTagsIn(render);
      if (tags.length === 0 || metaSetsSource || setsSourceOrHidesCode(story, sourceFile)) continue;
      problems.push(
        `${file}:${lineOf(sourceFile, d)} story "${d.name.text}" renders local helper(s) ${tags
          .map((t) => `<${t}>`)
          .join(", ")}, so "Show code" isn't copy-pasteable. Set parameters.docs.source.code to the real ` +
          "Jigsaw usage, or parameters.docs.codePanel: false if there's no single snippet to copy."
      );
    }
  }

  // Rule 2: no layout classes on Text / Heading.
  const visit = (n) => {
    if ((ts.isJsxOpeningElement(n) || ts.isJsxSelfClosingElement(n)) && TEXT_COMPONENTS.test(n.tagName.getText(sourceFile))) {
      for (const attr of n.attributes.properties) {
        if (!ts.isJsxAttribute(attr) || !attr.initializer) continue;
        const prop = attr.name.getText(sourceFile);
        if (prop !== "className" && prop !== "classNameOverrides") continue;
        // Drop object keys (`component:`) but keep Tailwind variants (`md:flex`):
        // a key is followed by a quoted string, a variant by a class name.
        const text = attr.initializer
          .getText(sourceFile)
          .replace(/\b[\w$]+\s*:\s*(?=["'`])/g, " ")
          .replace(/[{}"'`,]/g, " ");
        const match = LAYOUT_CLASS.exec(text);
        if (match) {
          problems.push(
            `${file}:${lineOf(sourceFile, n)} <${n.tagName.getText(sourceFile)}> has the layout class "${match[0].trim()}" ` +
              `in ${prop}. Put layout on a wrapper element instead.`
          );
        }
      }
    }
    ts.forEachChild(n, visit);
  };
  visit(sourceFile);

  return problems;
}
