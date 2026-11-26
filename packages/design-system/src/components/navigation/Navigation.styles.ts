import { cva } from "class-variance-authority";

export const navigationStyles = {
  component: cva(["w-full border-b border-border-primary bg-surface-primary"]),
  container: cva("max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"),
};

export const navigationInnerStyles = {
  component: cva("flex items-center justify-between h-16"),
};

export const navigationBrandStyles = {
  component: cva([
    "flex items-center gap-2",
    "text-lg font-semibold text-foreground-primary",
    "outline-hidden focus-visible:ring-2 focus-visible:ring-interactive-focus rounded",
  ]),
};

export const navigationLinksStyles = {
  component: cva("hidden md:flex items-center gap-1"),
};

export const navigationLinkStyles = {
  component: cva([
    "px-3 py-2 text-sm font-medium rounded-md transition-colors",
    "text-foreground-secondary hover:text-foreground-primary hover:bg-surface-hover",
    "outline-hidden focus-visible:ring-2 focus-visible:ring-interactive-focus",
    "data-current:text-interactive-primary data-current:bg-interactive-secondary",
  ]),
};

export const navigationActionsStyles = {
  component: cva("flex items-center gap-2"),
};

/** MobileNavigation renders a fragment (toggle + overlay), so it has no single root slot. */
export const mobileNavigationStyles = {
  mobileMenuButton: cva([
    "md:hidden p-2 rounded-md",
    "text-foreground-secondary hover:text-foreground-primary hover:bg-surface-hover",
    "outline-hidden focus-visible:ring-2 focus-visible:ring-interactive-focus",
  ]),
  /** Full-screen overlay (React Aria `ModalOverlay`): locks scroll and hides the page behind. */
  mobileMenu: cva([
    "fixed inset-0 z-50 bg-surface-primary flex flex-col",
    "md:hidden",
  ]),
  /** React Aria `Modal` inside the overlay. */
  mobileMenuModal: cva(["flex flex-1 flex-col min-h-0"]),
  /** React Aria `Dialog`: contains focus and closes on Escape. */
  mobileMenuDialog: cva(["flex flex-1 flex-col min-h-0 outline-hidden"]),
  mobileMenuHeader: cva([
    "flex items-center justify-between h-16 px-4 border-b border-border-primary shrink-0",
  ]),
  mobileMenuBody: cva(["flex-1 overflow-y-auto px-4 py-6 space-y-1"]),
  mobileNavItem: cva([
    "flex items-center px-4 py-3 text-lg font-medium rounded-lg transition-colors",
    "text-foreground-secondary hover:text-foreground-primary hover:bg-surface-hover",
    "data-current:text-interactive-primary data-current:bg-interactive-secondary",
  ]),
};
