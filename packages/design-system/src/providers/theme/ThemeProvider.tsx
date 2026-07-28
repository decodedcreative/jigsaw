import { createContext, useMemo, FC } from "react";
import type { ReactNode } from "react";
import type { TwMergeFn } from "../../theme/config";

export type ThemeContextValue = {
  /**
   * Optional subtree override for class-name merging.
   * When omitted, hooks fall back to `getTwMerge()` (module configure / stock).
   */
  twMerge?: TwMergeFn;
};

/**
 * Client-only theme context for **nested** overrides in interactive trees.
 *
 * App-wide custom `twMerge` should use `configureTwMerge` / `configureTheme`
 * instead — those work in Server Components. `ThemeProvider` is optional.
 */
export const ThemeContext = createContext<ThemeContextValue | undefined>(
  undefined
);

type ThemeProviderProps = {
  children: ReactNode;
  value?: ThemeContextValue;
};

export const ThemeProvider: FC<ThemeProviderProps> = ({ children, value }) => {
  const mergedValue = useMemo<ThemeContextValue>(
    () => ({
      twMerge: value?.twMerge,
    }),
    [value]
  );

  return (
    <ThemeContext.Provider value={mergedValue}>
      {children}
    </ThemeContext.Provider>
  );
};

ThemeProvider.displayName = "DS_ThemeProvider";
