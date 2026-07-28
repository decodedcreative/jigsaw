import type { ClassNameOverrides } from "@jsw-types/component-props";
import { getTwMerge } from "../theme/config";

/**
 * Merges default class names from CVA with any user-provided `classNameOverrides`.
 *
 * Defaults to the app-wide merge from `configureTwMerge` / `configureTheme`
 * (stock `tailwind-merge` when unset). Pass `twMergeFn` to override per call.
 */
export const getClassNames = <
  TStyles extends Record<string, (props?: Record<string, unknown>) => string>,
>(
  classNames: TStyles,
  classNameOverrides: ClassNameOverrides<TStyles> = {},
  props: Partial<Record<keyof TStyles, Record<string, unknown>>> = {},
  twMergeFn = getTwMerge()
) => {
  return Object.keys(classNames).reduce(
    (acc, key) => {
      const slotKey = key as keyof TStyles;
      const baseClasses = classNames[slotKey](props[slotKey] || {});
      const overrideClasses = classNameOverrides[slotKey];
      acc[slotKey] = twMergeFn(baseClasses, overrideClasses ?? "");
      return acc;
    },
    {} as Record<keyof TStyles, string>
  );
};
