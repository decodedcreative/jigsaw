import { useMemo } from "react";
import { twMerge } from "tailwind-merge";
import type { RootClassName } from "@jsw-types/component-props";
import { mergeRootClassName } from "@utils/mergeRootClassName";
import { useThemeProvider } from "./useThemeProvider";

/**
 * Memoised root className merge for JSW-7 components.
 * Use after `useGetClassNames` to compose the `component` slot with `className`.
 */
export function useRootClassName<P extends { defaultClassName?: string }>(
  slotClassName: string,
  className?: RootClassName<P>
) {
  const theme = useThemeProvider();
  const twMergeFn = theme?.twMerge ?? twMerge;

  return useMemo(
    () => mergeRootClassName(slotClassName, className, twMergeFn),
    [slotClassName, className, twMergeFn]
  );
}
