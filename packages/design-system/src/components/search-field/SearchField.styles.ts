import { cva } from "class-variance-authority";
import { formStyles } from "@components/form/Form.styles";

export const searchFieldStyles = {
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
  inputWrapper: cva(["relative flex items-center"]),
  searchIcon: cva(["absolute left-3 text-foreground-muted pointer-events-none"]),
  input: cva(
    [
      "w-full rounded-default border bg-surface-default text-foreground-primary transition-colors",
      "placeholder:text-foreground-muted",
      "focus:outline-hidden focus:ring-2 focus:ring-interactive-accent/20 focus:border-interactive-accent",
      "data-disabled:cursor-not-allowed data-disabled:bg-surface-muted data-disabled:text-foreground-muted data-disabled:border-border-default",
    ],
    {
      variants: {
        size: {
          sm: "pl-8 pr-8 py-1.5 text-xs",
          md: "pl-9 pr-9 py-2 text-sm",
          lg: "pl-11 pr-11 py-3 text-base",
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
  clearButton: cva(
    [
      "absolute right-2 p-1 rounded text-foreground-muted hover:text-foreground-primary hover:bg-surface-muted transition-colors",
      "focus:outline-hidden focus-visible:ring-2 focus-visible:ring-interactive-accent",
      "data-empty:hidden",
    ],
    {
      variants: {
        size: {
          sm: "h-5 w-5",
          md: "h-6 w-6",
          lg: "h-7 w-7",
        },
      },
      defaultVariants: { size: "md" },
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
