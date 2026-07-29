"use client";

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
 * Optional client-only provider for **nested** `twMerge` overrides.
 *
 * Do **not** wrap the whole app in this for default usage. Prefer
 * `configureTwMerge` / `configureTheme` for app-wide merge config (RSC-safe).
 * Use `ThemeProvider` only when a client subtree needs a different merge than
 * the module default.
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
