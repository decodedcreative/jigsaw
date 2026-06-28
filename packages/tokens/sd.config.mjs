import { cssHooks, cssPlatform } from "@jigsaw-ds/theme-build";
import {
  capitalize,
  discoverFigmaThemes,
  discoverSemanticModes,
  isThemeBaseToken,
  figmaTokens,
  FIGMA_OUTPUT_DIR,
  isStandaloneSemantic,
  mergeFigmaBaseAndSemantic,
  sortAppearanceModes,
  splitSemanticByMode,
  themeBaseSourceGlob,
  themeHasBase,
  themeSemanticSourceGlob,
} from "./scripts/index.mjs";
import { docsTokens } from "./scripts/formats/docs-tokens/index.mjs";
import { tailwindThemeCss } from "./scripts/formats/tailwind-theme-css/index.mjs";

const figmaFormats = { "figma/tokens": figmaTokens };

const CSS_BUILD_PATH = "dist/css/";
const FIGMA_BUILD_PATH = `${FIGMA_OUTPUT_DIR}/`;

/** @param {Array<{ destination: string, filter?: (token: object) => boolean, options?: object }>} files */
const figmaPlatform = (files) => ({
  buildPath: FIGMA_BUILD_PATH,
  log: { warnings: "disabled" },
  files: files.map(({ destination, filter, options }) => ({
    destination,
    format: "figma/tokens",
    ...(filter ? { filter } : {}),
    ...(options ? { options } : {}),
  })),
});

/** @param {string[]} source @param {Record<string, object>} platforms @param {object} hooks */
const sdConfig = (source, platforms, hooks) => ({ source, platforms, hooks });

// ─── Figma exports — theme JSON from packages/themes/{id}/src/ via discoverFigmaThemes() ─
// No transformGroup: css/js transforms mutate values (e.g. hex → RGB tuples).
// Figma exports read token.original via figma/tokens for source literals.
//
// log.warnings disabled: SD flags leaf-key name collisions on flat token.name —
// benign; we nest by full path. Output files follow {slug}.tokens.json convention.
// $themes.json for Tokens Studio sync → JSW-56 (allowlisted in verify script).

// Output filenames must match discoverFigmaOutputs() in scripts/figma/discovery/discover-outputs/discover-outputs.mjs.

const buildThemeFigmaConfig = (themeId) => {
  const modes = discoverSemanticModes(themeId);
  const hasBase = themeHasBase(themeId);
  const hasSemantic = modes.length > 0;
  if (!hasBase && !hasSemantic) return null;

  if (mergeFigmaBaseAndSemantic(themeId, modes)) {
    return sdConfig(
      [themeBaseSourceGlob(themeId), themeSemanticSourceGlob(themeId)],
      {
        figma: figmaPlatform([
          {
            destination: `${themeId}.tokens.json`,
            filter: (token) =>
              isThemeBaseToken(themeId, token) || token.path[0] === themeId,
            options: { stripModePrefixes: [themeId] },
          },
        ]),
      },
      { formats: figmaFormats },
    );
  }

  const source = [];
  const platforms = {};

  if (hasBase) {
    source.push(themeBaseSourceGlob(themeId));
    platforms.figmaBase = figmaPlatform([
      {
        destination: `${themeId}-base.tokens.json`,
        filter: (token) => isThemeBaseToken(themeId, token),
      },
    ]);
  }

  if (hasSemantic && splitSemanticByMode(themeId, modes)) {
    source.push(themeSemanticSourceGlob(themeId));
    for (const mode of sortAppearanceModes(modes)) {
      platforms[`figma${capitalize(mode)}`] = figmaPlatform([
        {
          destination: `${themeId}-${mode}.tokens.json`,
          filter: (token) => token.path[0] === mode,
          options: { stripFirstSegment: true },
        },
      ]);
    }
  } else if (hasSemantic && isStandaloneSemantic(themeId, modes)) {
    const mode = modes[0];
    source.push(themeSemanticSourceGlob(themeId));
    platforms.figmaSemantic = figmaPlatform([
      {
        destination: `${themeId}-semantic.tokens.json`,
        filter: (token) => token.path[0] === mode,
        options: { stripFirstSegment: true },
      },
    ]);
  }

  if (source.length === 0) return null;

  return sdConfig(source, platforms, { formats: figmaFormats });
};

// ─── Shared + Tailwind (fixed entry points) ───────────────────────────────────

const sharedConfig = sdConfig(
  ["src/tokens/shared/**/*.json"],
  {
    css: cssPlatform(
      [
        {
          destination: "shared/base.css",
          filter: () => true,
          options: { selector: ":root", stripFirstSegment: false, showFileHeader: true },
        },
      ],
      CSS_BUILD_PATH,
    ),
  },
  cssHooks,
);

const tailwindThemeConfig = sdConfig(
  ["src/tokens/shared/**/*.json", "src/tokens/color-schema/**/*.json"],
  {
    docs: {
      transformGroup: "js",
      buildPath: "dist/",
      files: [
        {
          destination: "docs-tokens.mjs",
          format: "docs/tokens",
          options: { showFileHeader: true },
        },
      ],
    },
    tailwindCss: {
      transformGroup: "js",
      buildPath: CSS_BUILD_PATH,
      files: [
        {
          destination: "tailwind-theme.css",
          format: "tailwind/theme-css",
          options: { showFileHeader: true },
        },
      ],
    },
  },
  {
    formats: {
      "docs/tokens": docsTokens,
      "tailwind/theme-css": tailwindThemeCss,
    },
  },
);

const figmaSharedConfig = sdConfig(
  ["src/tokens/shared/**/*.json"],
  { figma: figmaPlatform([{ destination: "shared.tokens.json" }]) },
  { formats: figmaFormats },
);

const themeFigmaConfigs = discoverFigmaThemes()
  .map((themeId) => buildThemeFigmaConfig(themeId))
  .filter(Boolean);

export default [
  sharedConfig,
  tailwindThemeConfig,
  figmaSharedConfig,
  ...themeFigmaConfigs,
];
