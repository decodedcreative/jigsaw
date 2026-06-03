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
          interactive: "",
          outline: "border-2",
        },
        interactiveState: {
          true: [
            "cursor-pointer",
            "hover:shadow-lg hover:border-border-hover",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2 focus-visible:ring-offset-surface-primary",
          ],
          false: "",
        },
      },
      defaultVariants: {
        variant: "default",
        interactiveState: false,
      },
    }
  ),
  header: cva("px-4 py-3 border-b border-border-primary", {
    variants: {
      hasActions: {
        true: "flex items-start justify-between gap-3",
        false: "",
      },
    },
    defaultVariants: {
      hasActions: false,
    },
  }),
  headerContent: cva("min-w-0 flex-1"),
  title: cva("text-lg font-semibold text-foreground-primary"),
  description: cva("text-sm text-foreground-secondary mt-1"),
  content: cva("p-4"),
  footer: cva("px-4 py-3 border-t border-border-primary bg-surface-secondary"),
  image: cva("w-full h-auto object-cover"),
};

