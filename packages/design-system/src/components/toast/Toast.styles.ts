import { cva } from "class-variance-authority";

export const toastStyles = {
  viewport: cva(
    ["fixed z-50 flex flex-col gap-2 p-4", "max-h-screen w-full sm:max-w-md"],
    {
      variants: {
        position: {
          "top-left": "top-0 left-0",
          "top-center": "top-0 left-1/2 -translate-x-1/2",
          "top-right": "top-0 right-0",
          "bottom-left": "bottom-0 left-0",
          "bottom-center": "bottom-0 left-1/2 -translate-x-1/2",
          "bottom-right": "bottom-0 right-0",
        },
      },
      defaultVariants: { position: "bottom-right" },
    }
  ),
  component: cva(
    [
      "flex items-start gap-3 w-full p-4 rounded-lg shadow-lg",
      "border border-border-primary bg-surface-primary",
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
          info: "border-interactive-primary bg-interactive-secondary",
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
        info: "text-interactive-primary",
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

export type ToastVariant = "default" | "success" | "warning" | "error" | "info";
export type ToastPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";
