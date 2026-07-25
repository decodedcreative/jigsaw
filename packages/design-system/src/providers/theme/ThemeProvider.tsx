"use client";

import { createContext, useMemo, FC } from "react";
import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

export const ThemeContext = createContext<{
  twMerge?: typeof twMerge;
}>({
  twMerge,
});

type ThemeProviderProps = {
  children: ReactNode;
  value?: {
    twMerge?: typeof twMerge;
  };
};

export const ThemeProvider: FC<ThemeProviderProps> = ({ children, value }) => {
  const mergedValue = useMemo(
    () => ({
      twMerge: value?.twMerge ?? twMerge,
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
