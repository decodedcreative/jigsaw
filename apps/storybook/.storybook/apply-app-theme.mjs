/** @typedef {"light" | "dark" | "portfolio"} AppTheme */

/** @param {Pick<Element, "setAttribute" | "removeAttribute">} root @param {AppTheme | string | undefined} theme */
export const applyAppTheme = (root, theme) => {
  if (!theme || theme === "light") {
    root.removeAttribute("data-theme");
    return;
  }

  root.setAttribute("data-theme", theme);
};
