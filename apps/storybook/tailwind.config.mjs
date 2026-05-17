/** @type {import('tailwindcss').Config} */
// Relative paths so PostCSS can resolve without package resolution
import theme from "../../packages/tokens/dist/theme.mjs";
import { semanticColors } from "../../packages/tokens/dist/semantic-colors.mjs";

export default {
  darkMode: ["class", '[data-theme="dark"]'],
  content: [
    "./stories/**/*.{js,ts,jsx,tsx}",
    "../../packages/design-system/src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
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
        xs: theme.shadow?.xs,
        sm: theme.shadow?.sm,
        DEFAULT: theme.shadow?.default,
        md: theme.shadow?.md,
        lg: theme.shadow?.lg,
        xl: theme.shadow?.xl,
        "2xl": theme.shadow?.["2xl"],
        inner: theme.shadow?.inner,
        none: theme.shadow?.none,
      },
    },
  },
  plugins: [],
};
