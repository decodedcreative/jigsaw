import { cva } from "class-variance-authority";

export const tabListStyles = {
  list: cva(["flex border-b border-border-primary"], {
    variants: {
      variant: {
        default: "gap-0",
        pills: "gap-2 border-b-0 bg-surface-secondary p-1 rounded-lg",
      },
    },
    defaultVariants: { variant: "default" },
  }),
};

