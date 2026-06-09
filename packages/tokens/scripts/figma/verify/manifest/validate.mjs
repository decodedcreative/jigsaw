import { validateDiscoveredTokenFiles } from "./discovered-files.mjs";
import { validateMetadataManifest } from "./metadata-manifest.mjs";
import { validateThemesManifest } from "./themes-manifest.mjs";

/** @returns {string[]} */
export const validateThemesMetadata = (figmaDir, tokenFiles) => {
  const tokenFileSet = new Set(tokenFiles);

  return [
    ...validateDiscoveredTokenFiles(tokenFiles),
    ...validateThemesManifest(figmaDir, tokenFileSet),
    ...validateMetadataManifest(figmaDir, tokenFileSet),
  ];
};
