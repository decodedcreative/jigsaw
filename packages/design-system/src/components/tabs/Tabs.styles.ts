import { cva } from "class-variance-authority";

export const tabsStyles = {
  root: cva("w-full"),
  list: cva(["flex border-b border-border-primary"], {
    variants: {
      variant: {
        default: "gap-0",
        pills: "gap-2 border-b-0 bg-surface-secondary p-1 rounded-lg",
      },
    },
    defaultVariants: { variant: "default" },
  }),
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
            "text-text-secondary hover:text-text-primary",
            "data-[selected]:border-interactive-primary data-[selected]:text-interactive-primary",
          ],
          pills: [
            "rounded-md",
            "text-text-secondary hover:text-text-primary hover:bg-surface-hover",
            "data-[selected]:bg-surface-primary data-[selected]:text-text-primary data-[selected]:shadow-sm",
          ],
        },
      },
      defaultVariants: { variant: "default" },
    }
  ),
  panel: cva("py-4 outline-none focus-visible:ring-2 focus-visible:ring-interactive-focus"),
};

export type TabsVariant = "default" | "pills";
