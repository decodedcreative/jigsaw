import { cva } from "class-variance-authority";

export const toastItemStyles = {
  component: cva(
    [
      "pointer-events-auto relative flex w-full min-w-[16rem] items-start gap-3 p-4",
      "rounded-lg border border-border-primary bg-surface-primary shadow-lg",
      "animate-in slide-in-from-right-full",
      "data-[exiting]:animate-out data-[exiting]:fade-out-0 data-[exiting]:slide-out-to-right-full",
    ],
    {
      variants: {
        variant: {
          default: "bg-surface-primary",
          success: "border-state-success-text bg-state-success-bg",
          warning: "border-state-warning-text bg-state-warning-bg",
          error: "border-state-error-text bg-state-error-bg",
          info: "border-state-info-border bg-state-info-bg",
        },
      },
      defaultVariants: { variant: "default" },
    }
  ),
  icon: cva("flex-shrink-0 w-5 h-5", {
    variants: {
      variant: {
        default: "text-foreground-secondary",
        success: "text-state-success-text",
        warning: "text-state-warning-text",
        error: "text-state-error-text",
        info: "text-state-info",
      },
    },
    defaultVariants: { variant: "default" },
  }),
  content: cva("flex-1 min-w-0"),
  title: cva("text-sm font-medium text-foreground-primary"),
  description: cva("text-sm text-foreground-secondary mt-1"),
  close: cva([
    "flex-shrink-0 p-1 rounded-md",
    "text-foreground-tertiary hover:text-foreground-primary hover:bg-surface-hover",
    "transition-colors outline-none",
    "focus-visible:ring-2 focus-visible:ring-interactive-focus",
  ]),
  action: cva([
    "text-sm font-medium underline-offset-4 hover:underline",
    "text-interactive-primary",
  ]),
};
