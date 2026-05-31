import { twMerge } from "tailwind-merge";
import type { ClassNameOverrides } from "@jsw-types/component-props";

/**
 * Merges default class names from CVA with any user-provided `classNameOverrides`.
 */
export const getClassNames = <
  TStyles extends Record<string, (props?: Record<string, unknown>) => string>,
>(
  classNames: TStyles,
  classNameOverrides: ClassNameOverrides<TStyles> = {},
  props: Partial<Record<keyof TStyles, Record<string, unknown>>> = {},
  twMergeFn = twMerge
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
