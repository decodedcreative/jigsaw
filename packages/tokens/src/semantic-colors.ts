/**
 * Semantic color mappings for Tailwind CSS.
 *
 * These wrap each CSS variable in `rgb(var(--…) / <alpha-value>)` so Tailwind's
 * opacity modifiers work correctly (e.g. `bg-state-error/20`,
 * `ring-interactive-accent/20`). Requires the variables in
 * `@jigsaw/tokens/semantic-light.css` / `semantic-dark.css` to be stored as
 * space-separated RGB tuples (the Style Dictionary build does this).
 */
const sc = (name: string) => `rgb(var(--color-${name}) / <alpha-value>)`;

export const semanticColors = {
  surface: {
    primary: sc("surface-primary"),
    secondary: sc("surface-secondary"),
    tertiary: sc("surface-tertiary"),
    DEFAULT: sc("surface-default"),
    default: sc("surface-default"),
    raised: sc("surface-raised"),
    overlay: sc("surface-overlay"),
    muted: sc("surface-muted"),
    subtle: sc("surface-subtle"),
    hover: sc("surface-hover"),
    inverse: sc("surface-inverse"),
  },
  foreground: {
    primary: sc("foreground-primary"),
    secondary: sc("foreground-secondary"),
    tertiary: sc("foreground-tertiary"),
    muted: sc("foreground-muted"),
    disabled: sc("foreground-disabled"),
    placeholder: sc("foreground-placeholder"),
    inverse: sc("foreground-inverse"),
    "on-primary": sc("foreground-on-primary"),
    "on-accent": sc("foreground-on-accent"),
  },
  border: {
    DEFAULT: sc("border-default"),
    default: sc("border-default"),
    primary: sc("border-primary"),
    strong: sc("border-strong"),
    hover: sc("border-hover"),
    subtle: sc("border-subtle"),
    focus: sc("border-focus"),
    disabled: sc("border-disabled"),
  },
  interactive: {
    primary: {
      DEFAULT: sc("interactive-primary"),
      hover: sc("interactive-primary-hover"),
      active: sc("interactive-primary-active"),
      disabled: sc("interactive-primary-disabled"),
    },
    accent: {
      DEFAULT: sc("interactive-accent"),
      hover: sc("interactive-accent-hover"),
      active: sc("interactive-accent-active"),
      disabled: sc("interactive-accent-disabled"),
    },
    secondary: {
      DEFAULT: sc("interactive-secondary"),
      hover: sc("interactive-secondary-hover"),
      active: sc("interactive-secondary-active"),
    },
    destructive: {
      DEFAULT: sc("interactive-destructive"),
      hover: sc("interactive-destructive-hover"),
    },
    focus: sc("interactive-focus"),
  },
  state: {
    error: {
      DEFAULT: sc("state-error"),
      text: sc("state-error-text"),
      bg: sc("state-error-bg"),
      border: sc("state-error-border"),
    },
    success: {
      DEFAULT: sc("state-success"),
      text: sc("state-success-text"),
      bg: sc("state-success-bg"),
      border: sc("state-success-border"),
    },
    warning: {
      DEFAULT: sc("state-warning"),
      text: sc("state-warning-text"),
      bg: sc("state-warning-bg"),
      border: sc("state-warning-border"),
    },
    info: {
      DEFAULT: sc("state-info"),
      bg: sc("state-info-bg"),
      border: sc("state-info-border"),
    },
  },
  brand: {
    primary: sc("brand-primary"),
    secondary: sc("brand-secondary"),
    accent: sc("brand-accent"),
  },
  link: {
    DEFAULT: sc("link-default"),
    hover: sc("link-hover"),
    visited: sc("link-visited"),
    active: sc("link-active"),
  },
} as const;
