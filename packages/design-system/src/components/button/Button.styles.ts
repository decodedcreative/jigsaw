import { cva } from "class-variance-authority";

export const buttonStyles = {
  component: cva(
    [
      "inline-flex items-center justify-center font-medium border transition-colors",
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
          ghost:
            "bg-transparent text-text-secondary border-transparent hover:bg-surface-muted",
          destructive:
            "bg-interactive-destructive text-text-inverse hover:bg-interactive-destructive-hover border-transparent",
          // Visually a link, rendered as a <button>. Use for non-navigation
          // actions that should read as inline text (e.g. "Forgot password?",
          // "Cancel", "Show more").
          link:
            "bg-transparent border-transparent text-interactive-primary hover:text-interactive-primary-hover underline underline-offset-2",
        },
        size: {
          sm: "px-3 py-1.5 text-xs rounded-default gap-1.5",
          md: "px-4 py-2 text-sm rounded-default gap-2",
          lg: "px-6 py-3 text-base rounded-md gap-2.5",
        },
      },
      // Strip the button-shaped padding/rounding from the link variant so it
      // sits inline like real text, while still respecting size for font-size.
      compoundVariants: [
        { variant: "link", class: "p-0 rounded-sm h-auto" },
      ],
      defaultVariants: {
        variant: "primary",
        size: "md",
      },
    }
  ),
};
