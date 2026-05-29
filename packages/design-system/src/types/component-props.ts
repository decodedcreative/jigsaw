/**
 * Extra Tailwind classes per style slot, merged with that slot's CVA defaults via `twMerge`.
 * Keys match `*Styles` export names; the outermost element uses `component`.
 */
export type ClassNameOverrides<TStyles extends Record<string, unknown>> = Partial<
  Record<keyof TStyles, string>
>;

/**
 * Strips `className` from a props type so consumers style components only via
 * `classNameOverrides` (including `component` for the root element).
 */
export type WithoutClassName<T> = Omit<T, "className">;
