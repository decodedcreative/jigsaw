import type { ClassNameOverrides } from "@jsw-types/component-props";
import { getTwMerge } from "../theme/config";

/**
 * Merges default class names from CVA with any user-provided `classNameOverrides`.
 *
 * **Preferred:** set the merge function once with app-wide `configureTwMerge`
 * (or `configureTheme`), then call `getClassNames` without a fourth argument.
 * That path is RSC-safe and keeps call sites free of merge plumbing.
 *
 * **Escape hatch:** pass `twMergeFn` only for one-off / test overrides. It wins
 * over the module config for that call only — it does not update app-wide state.
 *
 * @param twMergeFn - Optional per-call merge override. Defaults to `getTwMerge()`.
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
