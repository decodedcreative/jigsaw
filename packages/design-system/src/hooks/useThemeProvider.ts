import { useContext } from "react";
import { ThemeContext } from "@providers/theme";

/**
 * Reads optional client `ThemeProvider` context.
 * When absent, callers should fall back to `getTwMerge()` — ThemeProvider is not required.
 */
export const useThemeProvider = () => {
  return useContext(ThemeContext);
};
