import { createHash } from "node:crypto";
import { capitalize, mergeFigmaBaseAndSemantic } from "../../../discover-token-sets/index.mjs";
import { SHARED_SET, tokenFilename, tokenSetName } from "../../names/index.mjs";

export const stableThemeId = (name) =>
  createHash("sha1").update(`jsw56:${name}`).digest("hex");

export const themeGroup = (themeId, modes) =>
  mergeFigmaBaseAndSemantic(themeId, modes) ? "Theme" : capitalize(themeId);

export const themeDisplayName = (themeId, mode) =>
  `${capitalize(themeId)} ${capitalize(mode)}`;

/** Source token sets shared by all themes (shared + optional base). */
export const sourceTokenSets = (themeId, hasBase) => {
  const selectedTokenSets = { [SHARED_SET]: "source" };
  if (hasBase) {
    selectedTokenSets[tokenSetName(tokenFilename(`${themeId}-base`))] = "source";
  }
  return selectedTokenSets;
};

export const buildThemeRecord = (name, themeId, modes, selectedTokenSets) => ({
  id: stableThemeId(name),
  name,
  group: themeGroup(themeId, modes),
  selectedTokenSets,
});
