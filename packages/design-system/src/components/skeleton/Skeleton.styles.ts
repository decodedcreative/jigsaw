import { cva } from "class-variance-authority";

export const skeletonStyles = {
  component: cva(["animate-pulse bg-border-default rounded"], {
    variants: {
      variant: {
        default: "",
        circular: "rounded-full",
        text: "h-4 rounded",
      },
    },
    defaultVariants: { variant: "default" },
  }),
};

