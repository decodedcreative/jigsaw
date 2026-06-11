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
  fieldBody: cva([formStyles.fieldBody()]),
  group: cva(["flex items-stretch overflow-hidden rounded-default border"], {
    variants: {
      state: {
        default: "border-border-strong",
        error: "border-state-error",
        disabled: "border-border-default",
      },
    },
    defaultVariants: { state: "default" },
  }),
  input: cva(
    [
      "min-w-0 flex-1 border-0 rounded-none bg-surface-default text-foreground-primary text-center transition-colors",
      "placeholder:text-foreground-muted",
      "focus:outline-none focus:ring-2 focus:ring-inset focus:ring-interactive-accent/20",
      "data-[disabled]:cursor-not-allowed data-[disabled]:bg-surface-muted data-[disabled]:text-foreground-muted",
      "[appearance:textfield] [-moz-appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
    ],
    {
      variants: {
        size: {
          sm: "px-2 py-1.5 text-xs",
          md: "px-3 py-2 text-sm",
          lg: "px-4 py-3 text-base",
        },
        state: {
          default: "",
          error: "bg-state-error/5 focus:ring-state-error/20",
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
      "focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-interactive-accent",
      "data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed data-[disabled]:hover:bg-surface-muted data-[disabled]:hover:text-foreground-secondary",
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
      "focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-interactive-accent",
      "data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed data-[disabled]:hover:bg-surface-muted data-[disabled]:hover:text-foreground-secondary",
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
