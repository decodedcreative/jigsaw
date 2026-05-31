import { cva } from "class-variance-authority";

export const textStyles = {
  component: cva("font-sans leading-normal", {
    variants: {
      size: {
        xs: "text-xs",
        sm: "text-sm",
        base: "text-base",
        lg: "text-lg",
      },
      weight: {
        normal: "font-normal",
        medium: "font-medium",
        semibold: "font-semibold",
        bold: "font-bold",
      },
      muted: {
        true: "text-foreground-muted",
        false: "text-foreground-primary",
      },
    },
    defaultVariants: {
      size: "base",
      weight: "normal",
      muted: false,
    },
  }),
};
