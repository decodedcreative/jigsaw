/**
 * Strips `className` from consumer-facing props. Use `classNameOverrides` instead.
 */
export type WithoutClassName<T> = Omit<T, "className">;
