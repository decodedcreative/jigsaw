/**
 * Convert a CSS color value to a space-separated RGB tuple for CSS variables
 * (e.g. "#ff6b1a" → "255 107 26") for use inside `rgb(var(--color-*))` so
 * Tailwind opacity modifiers like `bg-surface-primary/20` resolve correctly.
 */
export const toRgbTuple = (value) => {
  if (typeof value !== "string") return value;
  const v = value.trim().toLowerCase();
  if (v === "transparent") return "0 0 0";
  const short = v.match(/^#([0-9a-f])([0-9a-f])([0-9a-f])$/);
  if (short) {
    const [, r, g, b] = short;
    return `${parseInt(r + r, 16)} ${parseInt(g + g, 16)} ${parseInt(b + b, 16)}`;
  }
  const long = v.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/);
  if (long) {
    const [, r, g, b] = long;
    return `${parseInt(r, 16)} ${parseInt(g, 16)} ${parseInt(b, 16)}`;
  }
  return value;
};
