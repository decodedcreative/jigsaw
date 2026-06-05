import { cva } from "class-variance-authority";
import { formStyles } from "@components/form/Form.styles";

export const selectStyles = {
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
  trigger: cva(
    [
      "group inline-flex items-center justify-between w-full rounded-default border bg-surface-default text-foreground-primary transition-colors",
      "focus:outline-none focus:ring-2 focus:ring-interactive-accent/20 focus:border-interactive-accent",
      "data-[disabled]:cursor-not-allowed data-[disabled]:bg-surface-muted data-[disabled]:text-foreground-muted",
      "data-[placeholder]:text-foreground-muted",
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
            "border-state-error focus:ring-state-error/20 focus:border-state-error",
          disabled: "border-border-default",
        },
      },
      defaultVariants: { size: "md", state: "default" },
    }
  ),
  chevron: cva(["text-foreground-muted transition-transform group-data-[open]:rotate-180"]),
  popover: cva([
    "w-[--trigger-width] bg-surface-default border border-border-default rounded-md shadow-lg",
    "entering:animate-in entering:fade-in entering:slide-in-from-top-2",
    "exiting:animate-out exiting:fade-out exiting:slide-out-to-top-2",
    "overflow-hidden",
  ]),
  listbox: cva(["outline-none p-1 max-h-60 overflow-auto"]),
  item: cva([
    "relative flex items-center px-3 py-2 text-sm text-foreground-primary rounded cursor-pointer outline-none",
    "data-[focused]:bg-surface-muted",
    "data-[selected]:bg-interactive-primary data-[selected]:text-foreground-inverse",
    "data-[disabled]:text-foreground-muted data-[disabled]:cursor-not-allowed",
  ]),
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
