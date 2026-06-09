import { THEMES_MANIFEST_FILE } from "../../constants/index.mjs";
import { buildThemesManifest } from "../../discovery/index.mjs";
import { setNameToFilename } from "../../names/index.mjs";
import { jsonEquals, readManifest } from "./utils/index.mjs";

/** @returns {string[]} */
const validateThemeSetReferences = (themes, tokenFileSet) => {
  const errors = [];

  for (const theme of themes) {
    if (!theme?.name || !theme?.selectedTokenSets) {
      errors.push(`${THEMES_MANIFEST_FILE}: each theme needs name and selectedTokenSets`);
      continue;
    }

    for (const setName of Object.keys(theme.selectedTokenSets)) {
      const filename = setNameToFilename(setName);
      if (!tokenFileSet.has(filename)) {
        errors.push(
          `${THEMES_MANIFEST_FILE}: theme "${theme.name}" references missing set "${setName}" (${filename})`,
        );
      }
    }
  }

  return errors;
};

/** @returns {string[]} */
export const validateThemesManifest = (figmaDir, tokenFileSet) => {
  const { data: themes, errors: readErrors } = readManifest(figmaDir, THEMES_MANIFEST_FILE);
  if (readErrors.length > 0) return readErrors;

  if (!Array.isArray(themes)) {
    return [`${THEMES_MANIFEST_FILE}: expected array`];
  }

  const expectedThemes = buildThemesManifest();
  if (!jsonEquals(themes, expectedThemes)) {
    return [`${THEMES_MANIFEST_FILE}: does not match buildThemesManifest() from source discovery`];
  }

  return validateThemeSetReferences(themes, tokenFileSet);
};
