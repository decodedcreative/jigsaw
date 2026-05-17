import { cva } from "class-variance-authority";

export const cardStyles = {
  root: cva(
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
        padding: {
          none: "",
          sm: "p-3",
          md: "p-4",
          lg: "p-6",
        },
      },
      defaultVariants: {
        variant: "default",
        padding: "none",
      },
    }
  ),
  header: cva("px-4 py-3 border-b border-border-primary"),
  title: cva("text-lg font-semibold text-text-primary"),
  description: cva("text-sm text-text-secondary mt-1"),
  content: cva("p-4"),
  footer: cva("px-4 py-3 border-t border-border-primary bg-surface-secondary"),
  image: cva("w-full h-auto object-cover"),
};

export type CardVariant = "default" | "elevated" | "interactive" | "outline";
export type CardPadding = "none" | "sm" | "md" | "lg";
