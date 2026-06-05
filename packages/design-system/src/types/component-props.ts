/**
 * Extra Tailwind classes per style slot, merged with that slot's CVA defaults via `twMerge`.
 * Keys match `*Styles` export names; the outermost element uses `component`.
 */
export type ClassNameOverrides<TStyles extends Record<string, unknown>> = Partial<
  Record<keyof TStyles, string>
>;

/**
 * Root-level `className` prop (JSW-7). String values merge via `twMerge`; function
 * values receive React Aria render props (including `defaultClassName`).
 *
 * After `useGetClassNames`, compose with `useRootClassName(classNames.component, className)`.
 */
export type RootClassName<P extends { defaultClassName?: string } = { defaultClassName?: string }> =
  | string
  | ((values: P) => string);

/**
 * Strips `className` from a props type so consumers style components only via
 * `classNameOverrides` (including `component` for the root element).
 */
export type WithoutClassName<T> = Omit<T, "className">;
