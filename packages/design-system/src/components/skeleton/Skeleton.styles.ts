import { cva } from "class-variance-authority";

export const skeletonStyles = {
  root: cva(["animate-pulse bg-surface-secondary rounded"], {
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

export type SkeletonVariant = "default" | "circular" | "text";
