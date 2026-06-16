/**
 * Helpers for reading theme CSS colour variables in docs and Storybook.
 */

/** Format a space-separated RGB tuple from a CSS custom property for display. */
export function formatCssRgbTupleForDisplay(raw: string): string {
  const trimmed = typeof raw === "string" ? raw.trim() : "";
  if (!trimmed) return "";
  if (!/^\d+(\s+\d+){2}$/.test(trimmed)) return "";
  return `rgb(${trimmed})`;
}

/**
 * Read and format a theme colour CSS variable.
 * Returns `rgb(r g b)` on success; descriptive labels for invalid, unset, or malformed values.
 */
export function readCssVariableColor(
  cssVar: string,
  getPropertyValue: (name: string) => string,
): string {
  if (typeof cssVar !== "string" || !cssVar.startsWith("--")) {
    return "invalid css var";
  }

  const raw = getPropertyValue(cssVar).trim();
  if (!raw) return `${cssVar} unset`;

  const formatted = formatCssRgbTupleForDisplay(raw);
  return formatted || `${cssVar} malformed`;
}
