import { cva } from "class-variance-authority";

export const linkButtonStyles = {
  component: cva(
    [
      "inline-flex items-center justify-center font-medium border transition-colors rounded-default",
      "focus:outline-hidden focus-visible:ring-2 focus-visible:ring-interactive-accent focus-visible:ring-offset-2",
      "data-disabled:opacity-50 data-disabled:pointer-events-none",
      "data-pressed:scale-[0.98]",
    ],
    {
      variants: {
        variant: {
          primary:
            "bg-interactive-primary text-foreground-inverse hover:bg-interactive-primary-hover border-transparent",
          secondary:
            "bg-surface-muted text-foreground-primary hover:bg-surface-subtle border-transparent",
          accent:
            "bg-interactive-accent text-foreground-inverse hover:bg-interactive-accent-hover border-transparent",
          outline:
            "bg-transparent text-interactive-primary border-border-strong hover:bg-surface-subtle",
          ghost: "bg-transparent text-foreground-secondary border-transparent hover:bg-surface-muted",
        },
        size: {
          sm: "px-3 py-1.5 text-xs gap-1.5",
          md: "px-4 py-2 text-sm gap-2",
          lg: "px-6 py-3 text-base gap-2.5",
        },
      },
      defaultVariants: { variant: "primary", size: "md" },
    }
  ),
};
