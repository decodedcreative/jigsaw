import { cva } from "class-variance-authority";

export const modalContentStyles = {
  header: cva(["flex items-center justify-between p-6 border-b border-border-default"]),
  title: cva(["text-lg font-semibold text-foreground-primary"]),
  closeButton: cva([
    "p-1.5 rounded-md text-foreground-muted hover:text-foreground-primary hover:bg-surface-muted transition-colors",
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-interactive-accent",
  ]),
  body: cva(["p-6"]),
};
