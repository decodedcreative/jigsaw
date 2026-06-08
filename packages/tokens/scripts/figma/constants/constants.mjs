/** Figma / Tokens Studio export conventions (relative to packages/tokens). */
export const figmaExport = {
  outputDir: "figma",
  sharedTokenFile: "shared.tokens.json",
  manifests: {
    themes: "$themes.json",
    metadata: "$metadata.json",
  },
  /** Matches sd.config output convention: `{slug}.tokens.json` (kebab-case). */
  tokenFilePattern: /^[a-z0-9]+(?:-[a-z0-9]+)*\.tokens\.json$/,
  /** Detects Style Dictionary css/color transform leaking into Figma exports. */
  cssTransformedColor: /^rgba?\(\d+\s*,/,
};

/** Non-token files allowed in the figma output directory — derived from manifest filenames. */
export const FIGMA_OUTPUT_ALLOWLIST = new Set(Object.values(figmaExport.manifests));

export const FIGMA_OUTPUT_DIR = figmaExport.outputDir;
export const SHARED_TOKEN_FILENAME = figmaExport.sharedTokenFile;
export const THEMES_MANIFEST_FILE = figmaExport.manifests.themes;
export const METADATA_MANIFEST_FILE = figmaExport.manifests.metadata;
export const TOKEN_FILE_RE = figmaExport.tokenFilePattern;
export const CSS_TRANSFORMED_COLOR = figmaExport.cssTransformedColor;
