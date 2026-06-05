import { cva } from "class-variance-authority";
import { formStyles } from "@components/form/Form.styles";

export const inputStyles = {
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
  input: cva(
    [
      "w-full rounded-default border bg-surface-default text-foreground-primary transition-colors",
      "placeholder:text-foreground-muted",
      "focus:outline-none focus:ring-2 focus:ring-interactive-accent/20 focus:border-interactive-accent",
      "data-[disabled]:cursor-not-allowed data-[disabled]:bg-surface-muted data-[disabled]:text-foreground-muted data-[disabled]:border-border-default",
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
        default: "text-foreground-muted",
        error: "text-state-error",
        disabled: "text-foreground-muted",
      },
    },
    defaultVariants: { state: "default" },
  }),
};
