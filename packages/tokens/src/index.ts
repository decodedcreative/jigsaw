/**
 * @jigsaw/tokens — design tokens via Style Dictionary (Jigsaw)
 *
 * Consume tokens as:
 * - CSS variables (shared):  import "@jigsaw/tokens/shared/base.css"
 * - CSS variables (default): import "@jigsaw/tokens/themes/default/base.css"
 *                            import "@jigsaw/tokens/themes/default/semantic-light.css"
 *                            import "@jigsaw/tokens/themes/default/semantic-dark.css"
 * - CSS variables (portfolio): import "@jigsaw/tokens/themes/portfolio/base.css"
 *                              import "@jigsaw/tokens/themes/portfolio/semantic.css"
 * - Tailwind base theme: import theme from "@jigsaw/tokens/theme" for base token values
 * - Tailwind semantic colors: import { semanticColors } from "@jigsaw/tokens/semantic-colors"
 */
export const tokensPackageVersion = "0.0.1";
export { semanticColors } from "./semantic-colors";
