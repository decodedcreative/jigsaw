/** Storybook/docs-only token values generated as `dist/docs-tokens.mjs`. */
type DocsTokens = {
  spacing: Record<string, string>;
  font: {
    family: Record<string, string>;
    size: Record<string, string>;
    weight: Record<string, string>;
    lineHeight: Record<string, string>;
    letterSpacing: Record<string, string>;
  };
  shadow: Record<string, string>;
  borderRadius: Record<string, string>;
  color: {
    navy: Record<string, string>;
    orange: Record<string, string>;
    grey: Record<string, string>;
    white: string;
    black: string;
  };
  motion?: {
    duration: Record<string, string>;
    easing: Record<string, string>;
  };
};

declare const docsTokens: DocsTokens;
export default docsTokens;
