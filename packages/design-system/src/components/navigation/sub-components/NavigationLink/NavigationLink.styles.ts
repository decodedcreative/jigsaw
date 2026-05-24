import { cva } from "class-variance-authority";

export const navigationLinkStyles = {
  navItem: cva([
    "px-3 py-2 text-sm font-medium rounded-md transition-colors",
    "text-foreground-secondary hover:text-foreground-primary hover:bg-surface-hover",
    "outline-none focus-visible:ring-2 focus-visible:ring-interactive-focus",
    "data-[current]:text-interactive-primary data-[current]:bg-interactive-secondary",
    "max-md:px-4 max-md:py-3 max-md:text-lg max-md:rounded-lg",
  ]),
};
