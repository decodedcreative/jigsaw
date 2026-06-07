import { cva } from "class-variance-authority";

export const checkboxStyles = {
  wrapper: cva(["group flex items-start gap-3 cursor-pointer data-[disabled]:cursor-not-allowed"]),
  box: cva(
    [
      "relative flex items-center justify-center shrink-0 border-2 rounded transition-colors",
      "group-data-[disabled]:opacity-50 group-data-[disabled]:cursor-not-allowed",
    ],
    {
      variants: {
        size: {
          sm: "h-4 w-4",
          md: "h-5 w-5",
          lg: "h-6 w-6",
        },
        state: {
          default: [
            "border-border-strong bg-surface-default",
            "group-data-[selected]:bg-interactive-primary group-data-[selected]:border-interactive-primary",
            "group-data-[indeterminate]:bg-interactive-primary group-data-[indeterminate]:border-interactive-primary",
          ],
          error: [
            "border-state-error bg-surface-default",
            "group-data-[selected]:bg-state-error group-data-[selected]:border-state-error",
            "group-data-[indeterminate]:bg-state-error group-data-[indeterminate]:border-state-error",
          ],
        },
      },
      defaultVariants: { size: "md", state: "default" },
    }
  ),
  icon: cva(["absolute text-foreground-inverse"]),
  label: cva(["select-none transition-colors group-data-[disabled]:text-foreground-muted"], {
    variants: {
      size: {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
      },
    },
    defaultVariants: { size: "md" },
  }),
  description: cva(["text-foreground-muted mt-0.5"], {
    variants: {
      size: {
        sm: "text-xs",
        md: "text-xs",
        lg: "text-sm",
      },
    },
    defaultVariants: { size: "md" },
  }),
};
