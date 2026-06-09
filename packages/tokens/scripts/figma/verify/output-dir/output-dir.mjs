import fs from "node:fs";
import { FIGMA_OUTPUT_ALLOWLIST, TOKEN_FILE_RE } from "../../constants/index.mjs";

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
    else errors.push(`Unexpected file in figma/: ${entry.name} (expected {slug}.tokens.json)`);
  }

  files.sort();

  if (files.length === 0) {
    errors.unshift(`No *.tokens.json files found in ${figmaDir}`);
  }

  return { files, errors };
};
