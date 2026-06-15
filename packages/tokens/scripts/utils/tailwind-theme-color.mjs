/**
 * Map a Style Dictionary colour token path to a Tailwind theme value that
 * references the runtime CSS custom property.
 *
 * Emits `rgb(var(--color-…) / <alpha-value>)` so utilities like `bg-navy-500/20`
 * resolve against variables defined in theme CSS (`--color-navy-500: R G B`).
 * Palette values live in theme CSS; Tailwind only references variable names.
 *
 * @param {string[]} path Token path whose first segment is `color`.
 */
export const tailwindColorVarRef = (path) =>
  `rgb(var(--color-${path.slice(1).join("-")}) / <alpha-value>)`;

/**
 * Format a space-separated RGB tuple from a CSS custom property for display.
 *
 * @param {string} raw Value from `getComputedStyle(...).getPropertyValue('--color-*')`.
 */
export function formatCssRgbTupleForDisplay(raw) {
  const trimmed = typeof raw === "string" ? raw.trim() : "";
  if (!trimmed) return "";
  if (!/^\d+(\s+\d+){2}$/.test(trimmed)) return "";
  return `rgb(${trimmed})`;
}

/**
 * @param {string} cssVar CSS custom property name (e.g. `--color-navy-500`).
 * @param {(name: string) => string} getPropertyValue
 */
export function readCssVariableColor(cssVar, getPropertyValue) {
  if (typeof cssVar !== "string" || !cssVar.startsWith("--")) return "";
  return formatCssRgbTupleForDisplay(getPropertyValue(cssVar));
}
