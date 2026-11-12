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


/** SkeletonCard is a preset layout; it exposes only the root slot. */
export const skeletonCardStyles = {
  component: cva("space-y-3"),
};
