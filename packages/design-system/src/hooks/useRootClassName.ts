import { useMemo } from "react";
import type { RootClassName } from "@jsw-types/component-props";
import { mergeRootClassName } from "@utils/mergeRootClassName";
import { getTwMerge } from "../theme/config";
import { useThemeProvider } from "./useThemeProvider";

/**
 * Memoised root className merge for JSW-7 components.
 * Use after `useGetClassNames` to compose the `component` slot with `className`.
 *
 * Prefers `ThemeProvider` subtree `twMerge`, then module `configureTwMerge`,
 * then stock `tailwind-merge`.
 */
export function useRootClassName<P extends { defaultClassName?: string }>(
  slotClassName: string,
  className?: RootClassName<P>
) {
  const theme = useThemeProvider();
  const twMergeFn = theme?.twMerge ?? getTwMerge();

  return useMemo(
    () => mergeRootClassName(slotClassName, className, twMergeFn),
    [slotClassName, className, twMergeFn]
  );
}
