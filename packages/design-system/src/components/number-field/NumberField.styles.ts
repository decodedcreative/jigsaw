import { cva } from "class-variance-authority";
import { formStyles } from "@components/form/Form.styles";

const stepButtonBase = [
  "absolute top-0 bottom-0 flex items-center justify-center bg-surface-muted text-foreground-secondary border transition-colors",
  "hover:bg-surface-subtle hover:text-foreground-primary",
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-interactive-accent focus-visible:z-10",
  "data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed data-[disabled]:hover:bg-surface-muted data-[disabled]:hover:text-foreground-secondary",
];

const stepButtonVariants = {
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
} as const;

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
  group: cva(["relative flex items-stretch"]),
  input: cva(
    [
      "flex-1 rounded-default border bg-surface-default text-foreground-primary text-center transition-colors",
      "placeholder:text-foreground-muted",
      "focus:outline-none focus:ring-2 focus:ring-interactive-accent/20 focus:border-interactive-accent focus:z-10",
      "data-[disabled]:cursor-not-allowed data-[disabled]:bg-surface-muted data-[disabled]:text-foreground-muted data-[disabled]:border-border-default",
      "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
    ],
    {
      variants: {
        size: {
          sm: "px-8 py-1.5 text-xs",
          md: "px-10 py-2 text-sm",
          lg: "px-12 py-3 text-base",
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
  decrementButton: cva([...stepButtonBase, "left-0 rounded-l-default border-r-0"], {
    variants: stepButtonVariants,
    defaultVariants: { size: "md", state: "default" },
  }),
  incrementButton: cva([...stepButtonBase, "right-0 rounded-r-default border-l-0"], {
    variants: stepButtonVariants,
    defaultVariants: { size: "md", state: "default" },
  }),
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
