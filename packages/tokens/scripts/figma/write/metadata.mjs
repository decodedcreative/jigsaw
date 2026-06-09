import fs from "node:fs";
import path from "node:path";
import {
  FIGMA_OUTPUT_DIR,
  METADATA_MANIFEST_FILE,
  THEMES_MANIFEST_FILE,
} from "../constants/index.mjs";
import {
  buildThemesManifest,
  discoverFigmaTokenSetOrder,
} from "../discovery/index.mjs";

/** @param {string} [figmaDir] */
export const writeFigmaMetadata = (figmaDir = FIGMA_OUTPUT_DIR) => {
  const dir = path.isAbsolute(figmaDir) ? figmaDir : path.join(process.cwd(), figmaDir);
  fs.mkdirSync(dir, { recursive: true });

  const themes = buildThemesManifest();
  const metadata = { tokenSetOrder: discoverFigmaTokenSetOrder() };

  fs.writeFileSync(path.join(dir, THEMES_MANIFEST_FILE), `${JSON.stringify(themes, null, 2)}\n`);
  fs.writeFileSync(path.join(dir, METADATA_MANIFEST_FILE), `${JSON.stringify(metadata, null, 2)}\n`);

  return { themes, metadata };
};
