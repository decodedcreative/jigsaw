import { cva } from "class-variance-authority";

export const headingStyles = {
  component: cva("font-heading text-foreground-primary", {
    variants: {
      size: {
        h1: "text-3xl font-bold leading-tight tracking-tight",
        h2: "text-2xl font-bold leading-tight tracking-tight",
        h3: "text-xl font-semibold leading-snug",
        h4: "text-lg font-semibold leading-snug",
        h5: "text-base font-semibold leading-normal",
        h6: "text-sm font-semibold leading-normal",
      },
      muted: {
        true: "text-foreground-secondary",
        false: "",
      },
    },
    defaultVariants: {
      size: "h2",
      muted: false,
    },
  }),
};
