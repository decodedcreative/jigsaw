/** Tailwind config for design-system (IDE/IntelliSense). Build runs in consuming apps. */
import theme from "@jigsaw/tokens/theme";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: theme.color,
      spacing: theme.spacing,
      fontFamily: theme.font.family,
      fontSize: theme.font.size,
      fontWeight: theme.font.weight,
      lineHeight: theme.font.lineHeight,
      borderRadius: theme.radius,
    },
  },
  plugins: [],
};
