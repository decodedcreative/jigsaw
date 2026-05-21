import { cva } from "class-variance-authority";

export const linkStyles = {
  component: cva(
    [
      "inline-flex items-center gap-1 font-medium transition-colors",
      "focus:outline-none focus-visible:ring-2 focus-visible:ring-interactive-accent focus-visible:ring-offset-2 rounded-sm",
      "data-[disabled]:opacity-50 data-[disabled]:pointer-events-none",
    ],
    {
      variants: {
        variant: {
          default:
            "text-interactive-primary hover:text-interactive-primary-hover underline underline-offset-2",
          accent:
            "text-interactive-accent hover:text-interactive-accent-hover underline underline-offset-2",
          subtle:
            "text-text-secondary hover:text-text-primary no-underline hover:underline underline-offset-2",
          muted:
            "text-text-muted hover:text-text-secondary no-underline hover:underline underline-offset-2",
        },
        size: {
          sm: "text-xs",
          md: "text-sm",
          lg: "text-base",
        },
      },
      defaultVariants: { variant: "default", size: "md" },
    }
  ),
};

export const linkButtonStyles = {
  component: cva(
    [
      "inline-flex items-center justify-center font-medium border transition-colors rounded-default",
      "focus:outline-none focus-visible:ring-2 focus-visible:ring-interactive-accent focus-visible:ring-offset-2",
      "data-[disabled]:opacity-50 data-[disabled]:pointer-events-none",
      "data-[pressed]:scale-[0.98]",
    ],
    {
      variants: {
        variant: {
          primary:
            "bg-interactive-primary text-text-inverse hover:bg-interactive-primary-hover border-transparent",
          secondary:
            "bg-surface-muted text-text-primary hover:bg-surface-subtle border-transparent",
          accent:
            "bg-interactive-accent text-text-inverse hover:bg-interactive-accent-hover border-transparent",
          outline:
            "bg-transparent text-interactive-primary border-border-strong hover:bg-surface-subtle",
          ghost: "bg-transparent text-text-secondary border-transparent hover:bg-surface-muted",
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
