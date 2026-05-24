import { cva } from "class-variance-authority";

export const cardContentStyles = {
  content: cva("", {
    variants: {
      padding: {
        none: "",
        sm: "p-3",
        md: "p-4",
        lg: "p-6",
      },
    },
    defaultVariants: {
      padding: "md",
    },
  }),
};

export type CardContentPadding = "none" | "sm" | "md" | "lg";
