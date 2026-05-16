import type { Config } from "tailwindcss";
import theme from "@jigsaw/tokens/theme";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/design-system/src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
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

export default config;
