import { cva } from "class-variance-authority";

export const selectItemStyles = {
  item: cva([
    "relative flex items-center px-3 py-2 text-sm text-foreground-primary rounded cursor-pointer outline-none",
    "data-[focused]:bg-surface-muted",
    "data-[selected]:bg-interactive-primary data-[selected]:text-foreground-inverse",
    "data-[disabled]:text-foreground-muted data-[disabled]:cursor-not-allowed",
  ]),
};
