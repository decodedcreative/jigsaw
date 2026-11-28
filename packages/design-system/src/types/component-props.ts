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
 * After `usePartProps`, compose with `useRootClassName(parts.component.className, className)`.
 */
export type RootClassName<P extends { defaultClassName?: string } = { defaultClassName?: string }> =
  | string
  | ((values: P) => string);

/**
 * Strips `className` from a props type so consumers style components only via
 * `classNameOverrides` (including `component` for the root element).
 */
export type WithoutClassName<T> = Omit<T, "className">;

/**
 * `ref` for the component's root element: the one that receives `className`
 * (JSW-127). Jigsaw supports React 19 only, where `ref` is a normal prop on
 * function components, so components take it in props and pass it to the root
 * instead of using the deprecated `forwardRef`.
 */
export type RefProp<TElement extends Element> = {
  ref?: import("react").Ref<TElement>;
};
