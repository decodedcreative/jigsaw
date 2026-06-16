/**
 * Map Style Dictionary token paths to Tailwind CSS v4 @theme custom properties.
 */

/** @param {string} suffix */
export const tailwindV4ColorInlineRef = (suffix) => `rgb(var(--color-${suffix}))`;

/** @param {string[]} path Token path starting with `color`. */
export const paletteColorCssVarSuffix = (path) => path.slice(1).join("-");

/**
 * @param {string[]} path
 * @returns {{ name: string, value: string } | null}
 */
export const tokenToThemeDeclaration = (path, value) => {
  const [root, ...rest] = path;

  if (root === "spacing") {
    return { name: `--spacing-${rest.join("-")}`, value };
  }

  if (root === "font") {
    const [group, key] = rest;
    if (group === "family") return { name: `--font-${key}`, value };
    if (group === "size") return { name: `--text-${key}`, value };
    if (group === "weight") return { name: `--font-weight-${key}`, value };
    if (group === "lineHeight") return { name: `--leading-${key}`, value };
    if (group === "letterSpacing") return { name: `--tracking-${key}`, value };
    return null;
  }

  if (root === "borderRadius") {
    const key = rest[0];
    return {
      name: key === "default" ? "--radius-default" : `--radius-${key}`,
      value,
    };
  }

  if (root === "shadow") {
    const key = rest[0];
    return {
      name: key === "default" ? "--shadow" : `--shadow-${key}`,
      value,
    };
  }

  if (root === "motion" && rest[0] === "duration") {
    return { name: `--transition-duration-${rest[1]}`, value };
  }

  return null;
};

/**
 * @param {string[]} path
 * @returns {{ name: string, value: string }}
 */
export const paletteColorInlineDeclaration = (path) => {
  const suffix = paletteColorCssVarSuffix(path);
  return {
    name: `--color-${suffix}`,
    value: tailwindV4ColorInlineRef(suffix),
  };
};

/**
 * @param {Array<{ name: string, value: string }>} declarations
 * @returns {Array<{ name: string, value: string }>}
 */
export const sortThemeDeclarations = (declarations) =>
  [...declarations].sort((a, b) => a.name.localeCompare(b.name));

/**
 * @param {Array<{ name: string, value: string }>} declarations
 * @returns {string}
 */
export const formatThemeBlock = (blockName, declarations) => {
  const lines = sortThemeDeclarations(declarations).map(
    ({ name, value }) => `  ${name}: ${value};`,
  );
  return `@${blockName} {\n${lines.join("\n")}\n}`;
};
