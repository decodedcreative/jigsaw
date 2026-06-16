import { cva } from "class-variance-authority";

export const navigationStyles = {
  component: cva(["w-full border-b border-border-primary bg-surface-primary"]),
  container: cva("max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"),
  inner: cva("flex items-center justify-between h-16"),
  brand: cva([
    "flex items-center gap-2",
    "text-lg font-semibold text-foreground-primary",
    "outline-hidden focus-visible:ring-2 focus-visible:ring-interactive-focus rounded",
  ]),
  nav: cva("hidden md:flex items-center gap-1"),
  navItem: cva([
    "px-3 py-2 text-sm font-medium rounded-md transition-colors",
    "text-foreground-secondary hover:text-foreground-primary hover:bg-surface-hover",
    "outline-hidden focus-visible:ring-2 focus-visible:ring-interactive-focus",
    "data-current:text-interactive-primary data-current:bg-interactive-secondary",
  ]),
  actions: cva("flex items-center gap-2"),
  mobileMenuButton: cva([
    "md:hidden p-2 rounded-md",
    "text-foreground-secondary hover:text-foreground-primary hover:bg-surface-hover",
    "outline-hidden focus-visible:ring-2 focus-visible:ring-interactive-focus",
  ]),
  mobileMenu: cva([
    "fixed inset-0 z-50 bg-surface-primary flex flex-col",
    "md:hidden",
  ]),
  mobileMenuHeader: cva([
    "flex items-center justify-between h-16 px-4 border-b border-border-primary shrink-0",
  ]),
  mobileMenuBody: cva([
    "flex-1 overflow-y-auto px-4 py-6 space-y-1",
  ]),
  mobileNavItem: cva([
    "flex items-center px-4 py-3 text-lg font-medium rounded-lg transition-colors",
    "text-foreground-secondary hover:text-foreground-primary hover:bg-surface-hover",
    "data-current:text-interactive-primary data-current:bg-interactive-secondary",
  ]),
};
