"use client";

import { getPartProps } from "@utils";
import { useMemo } from "react";
import type { ClassNameOverrides } from "@jsw-types/component-props";
import { getTwMerge } from "../theme/config";
import { useThemeProvider } from "./useThemeProvider";

/**
 * `getPartProps` for client components: memoised, and preferring the
 * `ThemeProvider` subtree's `twMerge`, then `configureTwMerge`, then stock
 * `tailwind-merge`, as `useGetClassNames` does.
 */
export function usePartProps<
  TStyles extends Record<string, (props?: Record<string, unknown>) => string>,
>(
  scope: string,
  styles: TStyles,
  classNameOverrides: ClassNameOverrides<TStyles> = {},
  variants: Partial<Record<keyof TStyles, Record<string, unknown>>> = {},
) {
  const theme = useThemeProvider();
  const twMergeFn = theme?.twMerge ?? getTwMerge();
  return useMemo(
    () => getPartProps(scope, styles, classNameOverrides, variants, twMergeFn),
    [scope, styles, classNameOverrides, variants, twMergeFn],
  );
}
