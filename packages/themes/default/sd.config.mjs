import { cssHooks, cssPlatform } from "@jigsaw/theme-build";

/**
 * Style Dictionary config for @jigsaw/theme-default (CSS only).
 *
 * Selectors match the previous @jigsaw/tokens default theme outputs:
 * - base.css → :root
 * - semantic-light.css → :root, [data-theme='light']
 * - semantic-dark.css → [data-theme='dark'], .dark
 */

export default {
  source: ["src/**/*.json"],
  platforms: {
    cssBase: cssPlatform([
      {
        destination: "base.css",
        filter: (token) => token.filePath.includes("/base/"),
        options: {
          selector: ":root",
          stripFirstSegment: false,
          showFileHeader: true,
        },
      },
    ]),
    cssLight: cssPlatform([
      {
        destination: "semantic-light.css",
        filter: (token) => token.path[0] === "light",
        options: {
          selector: ":root, [data-theme='light']",
          stripFirstSegment: true,
          showFileHeader: true,
        },
      },
    ]),
    cssDark: cssPlatform([
      {
        destination: "semantic-dark.css",
        filter: (token) => token.path[0] === "dark",
        options: {
          selector: "[data-theme='dark'], .dark",
          stripFirstSegment: true,
          showFileHeader: true,
        },
      },
    ]),
  },
  hooks: cssHooks,
};
