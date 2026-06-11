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
  group: cva(
    [
      "grid w-max max-w-full items-stretch overflow-hidden rounded-default border",
      "focus-within:outline-none focus-within:ring-2 focus-within:ring-inset",
    ],
    {
      variants: {
        size: {
          sm: "grid-cols-[1.75rem_2.5rem_1.75rem]",
          md: "grid-cols-[2.25rem_3rem_2.25rem]",
          lg: "grid-cols-[2.75rem_3.5rem_2.75rem]",
        },
        state: {
          default: "border-border-strong focus-within:ring-interactive-accent/20",
          error: "border-state-error focus-within:ring-state-error/20",
          disabled: "border-border-default",
        },
      },
      defaultVariants: { size: "md", state: "default" },
    }
  ),
  inputCell: cva(["flex min-w-0 items-center justify-center border-x bg-surface-default"], {
    variants: {
      state: {
        default: "border-border-strong",
        error: "border-state-error bg-state-error/5",
        disabled: "border-border-default bg-surface-muted",
      },
    },
    defaultVariants: { state: "default" },
  }),
  input: cva(
    [
      "h-full w-full min-w-0 max-w-full border-0 bg-transparent p-0 text-foreground-primary text-center",
      "placeholder:text-foreground-muted",
      "focus:outline-none focus:ring-0",
      "data-[focus-visible]:outline-none data-[focus-visible]:ring-0",
      "data-[disabled]:cursor-not-allowed data-[disabled]:text-foreground-muted",
      "[appearance:textfield] [-moz-appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
    ],
    {
      variants: {
        size: {
          sm: "py-1.5 text-xs",
          md: "py-2 text-sm",
          lg: "py-3 text-base",
        },
        state: {
          default: "",
          error: "",
          disabled: "",
        },
      },
      defaultVariants: { size: "md", state: "default" },
    }
  ),
  decrementButton: cva(
    [
      "flex h-full w-full items-center justify-center bg-surface-muted text-foreground-secondary transition-colors",
      "hover:bg-surface-subtle hover:text-foreground-primary",
      "focus:outline-none focus-visible:outline-none",
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
          default: "",
          error: "",
          disabled: "",
        },
      },
      defaultVariants: { size: "md", state: "default" },
    }
  ),
  incrementButton: cva(
    [
      "flex h-full w-full items-center justify-center bg-surface-muted text-foreground-secondary transition-colors",
      "hover:bg-surface-subtle hover:text-foreground-primary",
      "focus:outline-none focus-visible:outline-none",
      "data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed data-[disabled]:hover:bg-surface-muted data-[disabled]:hover:text-foreground-secondary",
    ],
    {
      variants: {
        size: {
          sm: "text-xs",
          md: "text-sm",
          lg: "text-base",
        },
        state: {
          default: "",
          error: "",
          disabled: "",
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
