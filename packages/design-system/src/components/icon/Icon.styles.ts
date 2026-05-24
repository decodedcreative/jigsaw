import { cva } from "class-variance-authority";

export const iconStyles = {
  component: cva(["shrink-0"], {
    variants: {
      size: {
        xs: "h-3 w-3",
        sm: "h-3.5 w-3.5",
        md: "h-4 w-4",
        lg: "h-5 w-5",
        xl: "h-6 w-6",
      },
      tone: {
        primary: "text-foreground-primary",
        secondary: "text-foreground-secondary",
        accent: "text-interactive-accent",
        success: "text-feedback-success",
        warning: "text-feedback-warning",
        error: "text-feedback-error",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }),
};

export type IconSize = "xs" | "sm" | "md" | "lg" | "xl";
