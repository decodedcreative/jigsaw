import fs from "node:fs";
import path from "node:path";
import { isPlainObject, readJsonFile } from "../utils/index.mjs";

/** Matches sd.config output convention: `{slug}.tokens.json` (kebab-case). */
export const TOKEN_FILE_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*\.tokens\.json$/;

/** Non-token files allowed in dist/figma/ once JSW-56 adds Tokens Studio metadata. */
export const FIGMA_OUTPUT_ALLOWLIST = new Set(["$themes.json"]);

/** Detects Style Dictionary css/color transform leaking into Figma exports. */
const CSS_TRANSFORMED_COLOR = /^rgba?\(\d+\s*,/;

const isTokenLeaf = (node) => isPlainObject(node) && "value" in node && "type" in node;

const leafErrors = (node, tokenPath) => {
  const errors = [];

  if (!isTokenLeaf(node)) {
    errors.push(`${tokenPath}: token leaf must include both "value" and "type"`);
    return errors;
  }

  if (Object.keys(node).length !== 2) {
    errors.push(`${tokenPath}: leaf must contain only "value" and "type"`);
  }

  if (typeof node.type !== "string" || node.type.length === 0) {
    errors.push(`${tokenPath}: "type" must be a non-empty string`);
  }

  if (typeof node.value !== "string" && typeof node.value !== "number") {
    errors.push(`${tokenPath}: "value" must be a string or number`);
  }

  if (
    node.type === "color" &&
    typeof node.value === "string" &&
    CSS_TRANSFORMED_COLOR.test(node.value)
  ) {
    errors.push(
      `${tokenPath}: color value looks CSS-transformed (${node.value}) — expected hex or literal`,
    );
  }

  return errors;
};

/** @returns {{ tokenCount: number, errors: string[] }} */
export const validateTokenTree = (root) => {
  const errors = [];
  let tokenCount = 0;

  const walk = (node, tokenPath) => {
    if (!isPlainObject(node)) {
      errors.push(`${tokenPath || "(root)"}: expected object`);
      return;
    }

    if ("value" in node || "type" in node) {
      errors.push(...leafErrors(node, tokenPath));
      tokenCount += 1;
      return;
    }

    for (const [key, child] of Object.entries(node)) {
      walk(child, tokenPath ? `${tokenPath}.${key}` : key);
    }
  };

  walk(root, "");
  return { tokenCount, errors };
};

/** @returns {{ files: string[], errors: string[] }} */
export const auditFigmaOutputDir = (figmaDir) => {
  if (!fs.existsSync(figmaDir)) {
    return { files: [], errors: [`Missing output directory: ${figmaDir}`] };
  }

  const files = [];
  const errors = [];

  for (const entry of fs.readdirSync(figmaDir, { withFileTypes: true })) {
    if (!entry.isFile()) continue;

    if (TOKEN_FILE_RE.test(entry.name)) files.push(entry.name);
    else if (FIGMA_OUTPUT_ALLOWLIST.has(entry.name)) continue;
    else errors.push(`Unexpected file in dist/figma/: ${entry.name} (expected {slug}.tokens.json)`);
  }

  files.sort();

  if (files.length === 0) {
    errors.unshift(`No *.tokens.json files found in ${figmaDir}`);
  }

  return { files, errors };
};

/** @returns {{ ok: boolean, fileCount: number, tokenCount: number, errors: string[] }} */
export const verifyFigmaExports = (figmaDir) => {
  const errors = [];
  const { files, errors: dirErrors } = auditFigmaOutputDir(figmaDir);
  errors.push(...dirErrors);

  let tokenCount = 0;

  for (const filename of files) {
    const filePath = path.join(figmaDir, filename);
    const { data, error } = readJsonFile(filePath);

    if (error) {
      errors.push(`${filename}: ${error}`);
      continue;
    }

    const result = validateTokenTree(data);
    tokenCount += result.tokenCount;
    errors.push(...result.errors.map((message) => `${filename}: ${message}`));

    if (result.tokenCount === 0 && result.errors.length === 0) {
      errors.push(`${filename}: expected at least one token`);
    }
  }

  return {
    ok: errors.length === 0,
    fileCount: files.length,
    tokenCount,
    errors,
  };
};
