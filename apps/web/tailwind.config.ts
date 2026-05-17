import type { Config } from "tailwindcss";
import theme from "@jigsaw/tokens/theme";
import { semanticColors } from "@jigsaw/tokens/semantic-colors";

const config: Config = {
  darkMode: ["class", '[data-theme="dark"]'],
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/design-system/src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Raw palette colors (navy, orange, grey, white, black)
        ...theme.color,
        // Semantic colors (surface, text, border, interactive, state, brand, link)
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
      transitionDuration: {
        instant: theme.motion.duration.instant,
        fastest: theme.motion.duration.fastest,
        faster: theme.motion.duration.faster,
        fast: theme.motion.duration.fast,
        normal: theme.motion.duration.normal,
        slow: theme.motion.duration.slow,
        slower: theme.motion.duration.slower,
        slowest: theme.motion.duration.slowest,
      },
    },
  },
  plugins: [],
};

export default config;
