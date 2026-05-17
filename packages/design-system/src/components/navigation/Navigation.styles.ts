import { cva } from "class-variance-authority";

export const navigationStyles = {
  root: cva(["w-full border-b border-border-primary bg-surface-primary"]),
  container: cva("max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"),
  inner: cva("flex items-center justify-between h-16"),
  brand: cva([
    "flex items-center gap-2",
    "text-lg font-semibold text-text-primary",
    "outline-none focus-visible:ring-2 focus-visible:ring-interactive-focus rounded",
  ]),
  nav: cva("hidden md:flex items-center gap-1"),
  navItem: cva([
    "px-3 py-2 text-sm font-medium rounded-md transition-colors",
    "text-text-secondary hover:text-text-primary hover:bg-surface-hover",
    "outline-none focus-visible:ring-2 focus-visible:ring-interactive-focus",
    "data-[current]:text-interactive-primary data-[current]:bg-interactive-secondary",
  ]),
  actions: cva("flex items-center gap-2"),
  mobileMenuButton: cva([
    "md:hidden p-2 rounded-md",
    "text-text-secondary hover:text-text-primary hover:bg-surface-hover",
    "outline-none focus-visible:ring-2 focus-visible:ring-interactive-focus",
  ]),
  mobileMenu: cva([
    "md:hidden border-t border-border-primary bg-surface-primary",
    "px-4 py-3 space-y-1",
  ]),
  mobileNavItem: cva([
    "block px-3 py-2 text-base font-medium rounded-md transition-colors",
    "text-text-secondary hover:text-text-primary hover:bg-surface-hover",
    "data-[current]:text-interactive-primary data-[current]:bg-interactive-secondary",
  ]),
};
