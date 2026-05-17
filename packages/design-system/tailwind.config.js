/** Tailwind config for design-system (IDE/IntelliSense). Build runs in consuming apps. */
import theme from "@jigsaw/tokens/theme";
import { semanticColors } from "@jigsaw/tokens/semantic-colors";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class", '[data-theme="dark"]'],
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ...theme.color,
        ...semanticColors,
      },
      spacing: theme.spacing,
      fontFamily: theme.font.family,
      fontSize: theme.font.size,
      fontWeight: theme.font.weight,
      lineHeight: theme.font.lineHeight,
      letterSpacing: theme.font.letterSpacing,
      borderRadius: theme.borderRadius,
      boxShadow: {
        xs: theme.shadow.xs,
        sm: theme.shadow.sm,
        DEFAULT: theme.shadow.default,
        md: theme.shadow.md,
        lg: theme.shadow.lg,
        xl: theme.shadow.xl,
        "2xl": theme.shadow["2xl"],
        inner: theme.shadow.inner,
        none: theme.shadow.none,
      },
    },
  },
  plugins: [],
};
