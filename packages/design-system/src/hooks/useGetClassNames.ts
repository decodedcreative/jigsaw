import { getClassNames } from "@utils";
import { useMemo } from "react";
import type { ClassNameOverrides } from "@jsw-types/component-props";
import { getTwMerge } from "../theme/config";
import { useThemeProvider } from "./useThemeProvider";

/**
 * React hook for getClassNames to memoize the result.
 *
 * Prefers `ThemeProvider` subtree `twMerge`, then module `configureTwMerge`,
 * then stock `tailwind-merge`.
 */
export function useGetClassNames<
  TStyles extends Record<string, (props?: Record<string, unknown>) => string>,
>(
  classNames: TStyles,
  classNameOverrides: ClassNameOverrides<TStyles> = {},
  props: Partial<Record<keyof TStyles, Record<string, unknown>>> = {}
) {
  const theme = useThemeProvider();
  const twMergeFn = theme?.twMerge ?? getTwMerge();

  return useMemo(
    () => getClassNames(classNames, classNameOverrides, props, twMergeFn),
    [classNames, classNameOverrides, props, twMergeFn]
  );
}
