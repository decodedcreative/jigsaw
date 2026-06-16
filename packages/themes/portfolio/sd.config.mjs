import { cssHooks, cssPlatform } from "@jigsaw/theme-build";

/**
 * Style Dictionary config for @jigsaw/theme-portfolio (CSS only).
 *
 * Selectors match the previous @jigsaw/tokens portfolio theme outputs:
 * - base.css → [data-theme='portfolio']
 * - semantic.css → [data-theme='portfolio'] (portfolio prefix stripped)
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
