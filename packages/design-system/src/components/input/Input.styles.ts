import { cva } from "class-variance-authority";

export const inputStyles = {
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
  input: cva(
    [
      "w-full rounded-default border bg-surface-default text-text-primary transition-colors",
      "placeholder:text-text-muted",
      "focus:outline-none focus:ring-2 focus:ring-interactive-accent/20 focus:border-interactive-accent",
      "data-[disabled]:cursor-not-allowed data-[disabled]:bg-surface-muted data-[disabled]:text-text-muted data-[disabled]:border-border-default",
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
            "border-state-error bg-state-error/5 focus:ring-state-error/20 focus:border-state-error",
          disabled: "border-border-default",
        },
      },
      defaultVariants: { size: "md", state: "default" },
    }
  ),
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
