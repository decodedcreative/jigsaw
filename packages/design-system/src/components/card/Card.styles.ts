import { cva } from "class-variance-authority";

export const cardStyles = {
  component: cva(
    [
      "rounded-lg border border-border-primary bg-surface-primary",
      "overflow-hidden transition-shadow duration-200",
    ],
    {
      variants: {
        variant: {
          default: "",
          elevated: "shadow-md",
          interactive: "hover:shadow-lg hover:border-border-hover cursor-pointer",
          outline: "border-2",
        },
      },
      defaultVariants: {
        variant: "default",
      },
    }
  ),
};

export type CardVariant = "default" | "elevated" | "interactive" | "outline";
