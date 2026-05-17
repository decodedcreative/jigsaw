import { cva } from "class-variance-authority";

export const checkboxGroupStyles = {
  group: cva(["flex flex-col gap-1"]),
  label: cva(["block text-sm font-medium mb-2 transition-colors"], {
    variants: {
      state: {
        default: "text-text-primary",
        error: "text-state-error",
        disabled: "text-text-muted",
      },
    },
    defaultVariants: { state: "default" },
  }),
  description: cva(["text-xs text-text-muted mb-3"]),
  errorMessage: cva(["text-xs text-state-error mt-2"]),
  options: cva(["flex flex-col gap-2"]),
};
