import { cva } from "class-variance-authority";
import { formStyles } from "@components/form/Form.styles";

export const radioGroupStyles = {
  group: cva(["flex flex-col gap-1", formStyles.field()]),
  label: cva(
    ["block text-sm font-medium mb-2 transition-colors", formStyles.fieldLabel()],
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
  description: cva(["text-xs text-foreground-muted mb-3"]),
  errorMessage: cva(["text-xs text-state-error mt-2"]),
  options: cva(["flex flex-col gap-2"]),
};
