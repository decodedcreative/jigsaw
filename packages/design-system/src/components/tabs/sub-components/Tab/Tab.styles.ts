import { cva } from "class-variance-authority";

export const tabStyles = {
  tab: cva(
    [
      "px-4 py-2 text-sm font-medium transition-colors outline-none",
      "focus-visible:ring-2 focus-visible:ring-interactive-focus focus-visible:ring-offset-2",
      "disabled:opacity-50 disabled:cursor-not-allowed",
    ],
    {
      variants: {
        variant: {
          default: [
            "border-b-2 border-transparent -mb-px",
            "text-foreground-secondary hover:text-foreground-primary",
            "data-[selected]:border-interactive-primary data-[selected]:text-interactive-primary",
          ],
          pills: [
            "rounded-md",
            "text-foreground-secondary hover:text-foreground-primary hover:bg-surface-hover",
            "data-[selected]:bg-surface-primary data-[selected]:text-foreground-primary data-[selected]:shadow-sm",
          ],
        },
      },
      defaultVariants: { variant: "default" },
    }
  ),
};
