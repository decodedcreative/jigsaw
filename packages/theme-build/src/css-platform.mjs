export const DEFAULT_CSS_BUILD_PATH = "dist/css/";

/**
 * @param {Array<{ destination: string, filter?: (token: object) => boolean, options?: object }>} files
 * @param {string} [buildPath]
 */
export const cssPlatform = (files, buildPath = DEFAULT_CSS_BUILD_PATH) => ({
  transformGroup: "css",
  buildPath,
  files: files.map(({ destination, filter, options }) => ({
    destination,
    format: "css/themed-variables",
    filter,
    options,
  })),
});
