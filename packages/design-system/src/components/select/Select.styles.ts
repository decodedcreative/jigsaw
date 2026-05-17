import { cva } from "class-variance-authority";

export const selectStyles = {
  wrapper: cva(["flex flex-col"]),
  label: cva(["block text-sm font-medium mb-1.5 transition-colors"], {
    variants: {
      state: {
        default: "text-text-primary",
        error: "text-state-error",
        disabled: "text-text-muted",
      },
    },
    defaultVariants: { state: "default" },
  }),
  trigger: cva(
    [
      "inline-flex items-center justify-between w-full rounded-default border bg-surface-default text-text-primary transition-colors",
      "focus:outline-none focus:ring-2 focus:ring-interactive-accent/20 focus:border-interactive-accent",
      "data-[disabled]:cursor-not-allowed data-[disabled]:bg-surface-muted data-[disabled]:text-text-muted",
      "data-[placeholder]:text-text-muted",
    ],
    {
      variants: {
        size: {
          sm: "px-2.5 py-1.5 text-xs",
          md: "px-3 py-2 text-sm",
          lg: "px-4 py-3 text-base",
        },
        state: {
          default: "border-border-strong",
          error:
            "border-state-error focus:ring-state-error/20 focus:border-state-error",
          disabled: "border-border-default",
        },
      },
      defaultVariants: { size: "md", state: "default" },
    }
  ),
  chevron: cva(["text-text-muted transition-transform data-[open]:rotate-180"], {
    variants: {
      size: {
        sm: "h-3 w-3",
        md: "h-4 w-4",
        lg: "h-5 w-5",
      },
    },
    defaultVariants: { size: "md" },
  }),
  popover: cva([
    "w-[--trigger-width] bg-surface-default border border-border-default rounded-md shadow-lg",
    "entering:animate-in entering:fade-in entering:slide-in-from-top-2",
    "exiting:animate-out exiting:fade-out exiting:slide-out-to-top-2",
    "overflow-hidden",
  ]),
  listbox: cva(["outline-none p-1 max-h-60 overflow-auto"]),
  item: cva([
    "relative flex items-center px-3 py-2 text-sm text-text-primary rounded cursor-pointer outline-none",
    "data-[focused]:bg-surface-muted",
    "data-[selected]:bg-interactive-primary data-[selected]:text-text-inverse",
    "data-[disabled]:text-text-muted data-[disabled]:cursor-not-allowed",
  ]),
  description: cva(["mt-1.5 text-xs"], {
    variants: {
      state: {
        default: "text-text-muted",
        error: "text-state-error",
        disabled: "text-text-muted",
      },
    },
    defaultVariants: { state: "default" },
  }),
};
