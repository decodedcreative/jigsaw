import { cssHooks, cssPlatform } from "@jigsaw-ds/theme-build";

/**
 * Style Dictionary config for @jigsaw-ds/theme-portfolio (CSS only).
 *
 * Selectors match the previous @jigsaw-ds/tokens portfolio theme outputs:
 * - base.css → [data-theme='portfolio'] (all src/base JSON sources)
 * - semantic.css → [data-theme='portfolio'] with portfolio prefix stripped
 *
 * Semantic tokens use the same --color-* variable names as the default theme,
 * but only apply under [data-theme='portfolio']; there is no cross-theme conflict
 * because each theme sheet scopes overrides to its own selector.
 *
 * The semantic filter (token.path[0] === "portfolio") exports every colour leaf
 * under src/semantic/colors.json; build-output.test.mjs asserts a 1:1 match.
 */

export default {
  source: ["src/**/*.json"],
  platforms: {
    cssBase: cssPlatform([
      {
        destination: "base.css",
        filter: (token) => token.filePath.includes("/base/"),
        options: {
          selector: "[data-theme='portfolio']",
          stripFirstSegment: false,
          showFileHeader: true,
        },
      },
    ]),
    cssSemantic: cssPlatform([
      {
        destination: "semantic.css",
        filter: (token) => token.path[0] === "portfolio",
        options: {
          selector: "[data-theme='portfolio']",
          stripFirstSegment: true,
          showFileHeader: true,
        },
      },
    ]),
  },
  hooks: cssHooks,
};
