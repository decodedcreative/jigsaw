import { cva } from "class-variance-authority";
import { formStyles } from "@components/form/Form.styles";

export const numberFieldStyles = {
  wrapper: cva(["flex flex-col", formStyles.field()]),
  label: cva(
    ["block text-sm font-medium mb-1.5 transition-colors", formStyles.fieldLabel()],
    {
      variants: {
        state: {
          default: "text-foreground-primary",
          error: "text-state-error",
          disabled: "text-foreground-muted",
        },
      },
      defaultVariants: { state: "default" },
    }
  ),
  fieldBody: cva(["flex flex-col", formStyles.fieldBody()]),
  group: cva(
    [
      "flex w-full items-stretch overflow-hidden rounded-default border",
      "focus-within:outline-hidden focus-within:ring-2 focus-within:ring-inset",
    ],
    {
      variants: {
        state: {
          default: "border-border-strong focus-within:ring-interactive-accent/20",
          error: "border-state-error focus-within:ring-state-error/20",
          disabled: "border-border-default",
        },
      },
      defaultVariants: { state: "default" },
    }
  ),
  input: cva(
    [
      "min-w-0 flex-1 border-0 rounded-none bg-surface-default text-foreground-primary text-center transition-colors",
      "placeholder:text-foreground-muted",
      "focus:outline-hidden focus:ring-0",
      "data-focus-visible:outline-hidden data-focus-visible:ring-0",
      "data-disabled:cursor-not-allowed data-disabled:bg-surface-muted data-disabled:text-foreground-muted",
      "[appearance:textfield] [-moz-appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
    ],
    {
      variants: {
        size: {
          sm: "px-1 py-1.5 text-xs",
          md: "px-1 py-2 text-sm",
          lg: "px-1 py-3 text-base",
        },
        state: {
          default: "",
          error: "bg-state-error/5",
          disabled: "",
        },
      },
      defaultVariants: { size: "md", state: "default" },
    }
  ),
  decrementButton: cva(
    [
      "shrink-0 flex items-center justify-center border-0 border-r bg-surface-muted text-foreground-secondary transition-colors",
      "hover:bg-surface-subtle hover:text-foreground-primary",
      "focus:outline-hidden",
      "data-disabled:opacity-50 data-disabled:cursor-not-allowed data-disabled:hover:bg-surface-muted data-disabled:hover:text-foreground-secondary",
    ],
    {
      variants: {
        size: {
          sm: "w-7 text-xs",
          md: "w-9 text-sm",
          lg: "w-11 text-base",
        },
        state: {
          default: "border-border-strong",
          error: "border-state-error",
          disabled: "border-border-default",
        },
      },
      defaultVariants: { size: "md", state: "default" },
    }
  ),
  incrementButton: cva(
    [
      "shrink-0 flex items-center justify-center border-0 border-l bg-surface-muted text-foreground-secondary transition-colors",
      "hover:bg-surface-subtle hover:text-foreground-primary",
      "focus:outline-hidden",
      "data-disabled:opacity-50 data-disabled:cursor-not-allowed data-disabled:hover:bg-surface-muted data-disabled:hover:text-foreground-secondary",
    ],
    {
      variants: {
        size: {
          sm: "w-7 text-xs",
          md: "w-9 text-sm",
          lg: "w-11 text-base",
        },
        state: {
          default: "border-border-strong",
          error: "border-state-error",
          disabled: "border-border-default",
        },
      },
      defaultVariants: { size: "md", state: "default" },
    }
  ),
  description: cva(["mt-1.5 text-xs"], {
    variants: {
      state: {
        default: "text-foreground-muted",
        error: "text-state-error",
        disabled: "text-foreground-muted",
      },
    },
    defaultVariants: { state: "default" },
  }),
};
