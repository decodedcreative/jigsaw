/**
 * @jigsaw/tokens — design tokens via Style Dictionary (Jigsaw)
 *
 * Consume tokens as:
 * - CSS variables: import "@jigsaw/tokens/base.css" for palette/spacing/typography
 *                  import "@jigsaw/tokens/semantic-light.css" for light theme semantic colors
 *                  import "@jigsaw/tokens/semantic-dark.css" for dark theme semantic colors
 * - Tailwind base theme: import theme from "@jigsaw/tokens/theme" for base token values
 * - Tailwind semantic colors: import { semanticColors } from "@jigsaw/tokens/semantic-colors"
 */
export const tokensPackageVersion = "0.0.1";
export { semanticColors } from "./semantic-colors";
