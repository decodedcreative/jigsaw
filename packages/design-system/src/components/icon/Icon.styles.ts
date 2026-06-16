import { cva } from "class-variance-authority";

const sizeVariants = {
  xs: "h-3 w-3",
  sm: "h-3.5 w-3.5",
  md: "h-4 w-4",
  lg: "h-5 w-5",
  xl: "h-6 w-6",
} as const;

const toneVariants = {
  primary: "text-foreground-primary",
  secondary: "text-foreground-secondary",
  accent: "text-interactive-accent",
  success: "text-state-success-text",
  warning: "text-state-warning-text",
  error: "text-state-error-text",
  info: "text-state-info",
  "on-accent": "text-foreground-on-accent",
} as const;

/**
 * Paths use `data-fill="primary" | "secondary" | …` and read `--icon-fill-*` from the root <svg>.
 * Fallback is currentColor (mono icons or inherited tone on the svg).
 */
const customPathFills = [
  "data-[fill=primary]:**:fill-(--icon-fill-primary,currentColor)",
  "data-[fill=secondary]:**:fill-(--icon-fill-secondary,currentColor)",
  "data-[fill=tertiary]:**:fill-(--icon-fill-tertiary,currentColor)",
  "data-[fill=quaternary]:**:fill-(--icon-fill-quaternary,currentColor)",
] as const;

/** Phosphor icons — single colour via tone / currentColor. */
export const iconStyles = {
  component: cva(["shrink-0"], {
    variants: {
      size: sizeVariants,
      tone: toneVariants,
    },
    defaultVariants: {
      size: "md",
    },
  }),
};

/** Custom SVG children — per-path fills via CSS custom properties. */
export const customIconStyles = {
  component: cva(["shrink-0", "inline-block", ...customPathFills], {
    variants: {
      size: sizeVariants,
      tone: toneVariants,
    },
    defaultVariants: {
      size: "md",
    },
  }),
};

