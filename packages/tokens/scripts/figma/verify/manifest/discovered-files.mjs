import { discoverFigmaFilenames } from "../../discovery/index.mjs";

/** @returns {string[]} */
export const validateDiscoveredTokenFiles = (tokenFiles) => {
  const errors = [];
  const tokenFileSet = new Set(tokenFiles);
  const expectedFilenames = discoverFigmaFilenames();

  for (const filename of expectedFilenames) {
    if (!tokenFileSet.has(filename)) {
      errors.push(`Missing expected token file: ${filename}`);
    }
  }

  for (const filename of tokenFiles) {
    if (!expectedFilenames.includes(filename)) {
      errors.push(`Unexpected token file (not in discovery): ${filename}`);
    }
  }

  return errors;
};
