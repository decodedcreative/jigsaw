import { cva } from "class-variance-authority";

export const disclosureStyles = {
  wrapper: cva([
    "border border-border-default rounded-md overflow-hidden",
    "data-[disabled]:opacity-50",
  ]),
  trigger: cva([
    "flex w-full items-center justify-between px-4 py-3 text-left bg-surface-default",
    "text-foreground-primary font-medium transition-colors",
    "hover:bg-surface-subtle focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-interactive-accent",
    "data-[disabled]:cursor-not-allowed data-[disabled]:hover:bg-surface-default",
  ]),
  chevron: cva([
    "h-4 w-4 text-foreground-muted transition-transform shrink-0 ml-2",
    "group-data-[expanded]:rotate-180",
  ]),
  panel: cva([
    "hidden group-data-[expanded]:block",
    "px-4 pb-4 pt-0 text-foreground-secondary text-sm",
  ]),
};

export const disclosureGroupStyles = {
  wrapper: cva(["flex flex-col gap-2"]),
};
