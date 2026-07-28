import type { ClassNameOverrides } from "@jsw-types/component-props";
import { getTwMerge } from "../theme/config";

/**
 * Merges default class names from CVA with any user-provided `classNameOverrides`.
 *
 * @param twMergeFn - Optional per-call merge override. When omitted, uses
 *   `getTwMerge()` (module `configureTwMerge` / stock `tailwind-merge`).
 *   Prefer app-wide `configureTwMerge` over passing this everywhere; reserve
 *   the argument for one-off merges (tests, rare call sites).
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
