import type { RootClassName } from "@jsw-types/component-props";

type TwMergeFn = (...classes: (string | undefined)[]) => string;

/**
 * Merges computed CVA slot classes with a root-level `className` prop (JSW-7).
 *
 * - String `className` values are merged via `twMerge` and returned as a string.
 * - Function `className` values (React Aria render props) return a function that
 *   composes slot classes with the user's render function. Render props include
 *   `defaultClassName` for RAC state classes when the consumer needs them.
 */
export function mergeRootClassName<P extends { defaultClassName?: string }>(
  slotClassName: string,
  className: RootClassName<P> | undefined,
  twMergeFn: TwMergeFn
): string | ((values: P) => string) {
  if (className == null) {
    return slotClassName;
  }

  if (typeof className === "function") {
    return (renderProps: P) => twMergeFn(slotClassName, className(renderProps));
  }

  return twMergeFn(slotClassName, className);
}
