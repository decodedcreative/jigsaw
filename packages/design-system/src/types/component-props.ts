/**
 * Strips `className` from a props type.
 *
 * Convention (Mantine-style):
 *   - Root element  → accept `className` directly (standard React prop, merged
 *                     with the component's computed root class via `twMerge`)
 *   - Internal slots → NOT exposed via `className`; use `classNameOverrides`
 *
 * Use this type when building internal slot prop types to ensure only the root
 * of a component exposes `className` to consumers.
 */
export type WithoutClassName<T> = Omit<T, "className">;
