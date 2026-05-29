import { cva } from "class-variance-authority";

export const badgeStyles = {
  component: cva(
    ["inline-flex items-center justify-center font-medium rounded-full transition-colors"],
    {
      variants: {
        variant: {
          default: "bg-surface-secondary text-text-primary",
          primary: "bg-brand-primary text-text-inverse",
          secondary: "bg-brand-secondary text-text-inverse",
          accent: "bg-brand-accent text-text-primary",
          outline: "border border-border-primary text-text-primary bg-transparent",
          success: "bg-state-success-bg text-state-success-text",
          warning: "bg-state-warning-bg text-state-warning-text",
          error: "bg-state-error-bg text-state-error-text",
        },
        size: {
          sm: "text-xs px-2 py-0.5",
          md: "text-sm px-2.5 py-0.5",
          lg: "text-sm px-3 py-1",
        },
      },
      defaultVariants: {
        variant: "default",
        size: "md",
      },
    }
  ),
};

export type BadgeVariant =
  | "default"
  | "primary"
  | "secondary"
  | "accent"
  | "outline"
  | "success"
  | "warning"
  | "error";
export type BadgeSize = "sm" | "md" | "lg";
