/** True for non-null, non-array objects (including Object.create(null)). */
export const isPlainObject = (value) =>
  value !== null && typeof value === "object" && !Array.isArray(value);
