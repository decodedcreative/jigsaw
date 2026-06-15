import {
  capitalize,
  discoverSemanticModes,
  discoverThemes,
  discoverFigmaThemes,
  isStandaloneSemantic,
  mergeFigmaBaseAndSemantic,
  sortAppearanceModes,
  splitSemanticByMode,
  themeHasBase,
} from "../../../discover-token-sets/index.mjs";
import { SHARED_TOKEN_FILENAME } from "../../constants/index.mjs";
import { SHARED_SET, tokenFilename, tokenSetName } from "../../names/index.mjs";
import {
  buildThemeRecord,
  sourceTokenSets,
  themeDisplayName,
} from "../theme-manifest/index.mjs";

/**
 * Canonical Figma token files derived from source discovery.
 * sd.config.mjs `buildThemeFigmaConfig` destinations must match these filenames.
 *
 * @returns {Array<{ filename: string, setName: string, theme?: { id: string, name: string, group: string, selectedTokenSets: Record<string, string> } }>}
 */
export const discoverFigmaOutputs = () => {
  const outputs = [{ filename: SHARED_TOKEN_FILENAME, setName: SHARED_SET }];

  for (const themeId of discoverFigmaThemes()) {
    const modes = discoverSemanticModes(themeId);
    const hasBase = themeHasBase(themeId);
    const hasSemantic = modes.length > 0;

    if (mergeFigmaBaseAndSemantic(themeId, modes)) {
      const name = capitalize(themeId);
      const filename = tokenFilename(themeId);
      const enabledSet = tokenSetName(filename);
      outputs.push({
        filename,
        setName: enabledSet,
        theme: buildThemeRecord(name, themeId, modes, {
          [SHARED_SET]: "source",
          [enabledSet]: "enabled",
        }),
      });
      continue;
    }

    if (hasBase) {
      const filename = tokenFilename(`${themeId}-base`);
      outputs.push({ filename, setName: tokenSetName(filename) });
    }

    if (hasSemantic && splitSemanticByMode(themeId, modes)) {
      for (const mode of sortAppearanceModes(modes)) {
        const name = themeDisplayName(themeId, mode);
        const filename = tokenFilename(`${themeId}-${mode}`);
        const enabledSet = tokenSetName(filename);
        outputs.push({
          filename,
          setName: enabledSet,
          theme: buildThemeRecord(name, themeId, modes, {
            ...sourceTokenSets(themeId, hasBase),
            [enabledSet]: "enabled",
          }),
        });
      }
    } else if (hasSemantic && isStandaloneSemantic(themeId, modes)) {
      const name = `${capitalize(themeId)} Semantic`;
      const filename = tokenFilename(`${themeId}-semantic`);
      const enabledSet = tokenSetName(filename);
      outputs.push({
        filename,
        setName: enabledSet,
        theme: buildThemeRecord(name, themeId, modes, {
          ...sourceTokenSets(themeId, hasBase),
          [enabledSet]: "enabled",
        }),
      });
    }
  }

  return outputs;
};

/** @returns {string[]} Token set names in load order (for $metadata.json). */
export const discoverFigmaTokenSetOrder = () =>
  discoverFigmaOutputs().map(({ setName }) => setName);

/** @returns {string[]} Expected `*.tokens.json` filenames on disk. */
export const discoverFigmaFilenames = () =>
  discoverFigmaOutputs().map(({ filename }) => filename);

/** @returns {Array<{ id: string, name: string, group: string, selectedTokenSets: Record<string, string> }>} */
export const buildThemesManifest = () =>
  discoverFigmaOutputs()
    .filter((output) => output.theme)
    .map((output) => output.theme);
