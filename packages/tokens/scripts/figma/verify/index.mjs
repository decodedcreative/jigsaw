import path from "node:path";
import { readJsonFile } from "../../utils/index.mjs";
import { validateThemesMetadata } from "./manifest/index.mjs";
import { auditFigmaOutputDir } from "./output-dir/index.mjs";
import { validateTokenTree } from "./token-tree/index.mjs";

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

  errors.push(...validateThemesMetadata(figmaDir, files));

  return {
    ok: errors.length === 0,
    fileCount: files.length,
    tokenCount,
    errors,
  };
};

export { auditFigmaOutputDir } from "./output-dir/index.mjs";
export {
  jsonEquals,
  readManifest,
  validateDiscoveredTokenFiles,
  validateMetadataManifest,
  validateThemesManifest,
  validateThemesMetadata,
} from "./manifest/index.mjs";
export { validateTokenTree } from "./token-tree/index.mjs";
