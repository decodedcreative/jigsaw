import { cva } from "class-variance-authority";

export const radioStyles = {
  wrapper: cva([
    "group flex items-start gap-3 cursor-pointer data-disabled:cursor-not-allowed",
  ]),
  circle: cva(
    [
      "flex items-center justify-center shrink-0 rounded-full border-2 transition-colors",
      "group-data-disabled:opacity-50 group-data-disabled:cursor-not-allowed",
    ],
    {
      variants: {
        size: {
          sm: "h-4 w-4",
          md: "h-5 w-5",
          lg: "h-6 w-6",
        },
        state: {
          default:
            "border-border-strong group-data-selected:border-interactive-primary",
          error: "border-state-error group-data-selected:border-state-error",
        },
      },
      defaultVariants: { size: "md", state: "default" },
    }
  ),
  dot: cva(
    ["rounded-full opacity-0 group-data-selected:opacity-100 transition-opacity"],
    {
      variants: {
        size: {
          sm: "h-2 w-2",
          md: "h-2.5 w-2.5",
          lg: "h-3 w-3",
        },
        state: {
          default: "bg-interactive-primary",
          error: "bg-state-error",
        },
      },
      defaultVariants: { size: "md", state: "default" },
    }
  ),
  label: cva(["select-none transition-colors group-data-disabled:text-foreground-muted"], {
    variants: {
      size: {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
      },
    },
    defaultVariants: { size: "md" },
  }),
  itemDescription: cva(["text-foreground-muted mt-0.5"], {
    variants: {
      size: {
        sm: "text-xs",
        md: "text-xs",
        lg: "text-sm",
      },
    },
    defaultVariants: { size: "md" },
  }),
};
