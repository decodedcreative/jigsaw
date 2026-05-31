import { getClassNames } from "@utils";
import { useMemo } from "react";
import { twMerge } from "tailwind-merge";
import type { ClassNameOverrides } from "@ds-types/component-props";
import { useThemeProvider } from "./useThemeProvider";

/**
 * React hook for getClassNames to memoize the result.
 */
export function useGetClassNames<
  TStyles extends Record<string, (props?: Record<string, unknown>) => string>,
>(
  classNames: TStyles,
  classNameOverrides: ClassNameOverrides<TStyles> = {},
  props: Partial<Record<keyof TStyles, Record<string, unknown>>> = {}
) {
  const theme = useThemeProvider();
  const twMergeFn = theme?.twMerge || twMerge;

  return useMemo(
    () => getClassNames(classNames, classNameOverrides, props, twMergeFn),
    [classNames, classNameOverrides, props, twMergeFn]
  );
}
