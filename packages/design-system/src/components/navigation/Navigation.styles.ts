import { cva } from "class-variance-authority";

export const navigationStyles = {
  component: cva(["w-full border-b border-border-primary bg-surface-primary"]),
  container: cva(
    "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16"
  ),
  menuButton: cva([
    "md:hidden p-2 rounded-md shrink-0",
    "text-foreground-secondary hover:text-foreground-primary hover:bg-surface-hover",
    "outline-none focus-visible:ring-2 focus-visible:ring-interactive-focus",
  ]),
  links: cva([
    "items-center gap-1",
    "hidden data-[open]:flex",
    "max-md:fixed max-md:inset-0 max-md:z-50 max-md:flex-col max-md:items-stretch",
    "max-md:bg-surface-primary max-md:gap-0 max-md:overflow-y-auto",
    "md:flex md:static md:flex-row",
  ]),
  mobileMenuHeader: cva([
    "md:hidden flex items-center justify-between h-16 px-4 border-b border-border-primary shrink-0",
  ]),
  linksBody: cva(["max-md:px-4 max-md:py-6 max-md:space-y-1 md:contents"]),
  actions: cva("flex items-center gap-2"),
};
