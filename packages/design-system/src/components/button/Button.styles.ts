import { cva } from "class-variance-authority";

export const buttonStyles = {
  component: cva(
    [
      "inline-flex items-center font-medium border transition-colors",
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
          ghost:
            "bg-transparent text-foreground-secondary border-transparent hover:bg-surface-muted",
          destructive:
            "bg-interactive-destructive text-foreground-inverse hover:bg-interactive-destructive-hover border-transparent",
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
        mediaOnly: {
          true: "shrink-0 justify-center p-0 h-auto min-h-0 rounded-full gap-0",
          false: "justify-center",
        },
        fullWidth: {
          true: "w-full",
          false: "",
        },
        mediaPosition: {
          left: "",
          right: "",
        },
      },
      compoundVariants: [
        { variant: "link", class: "p-0 rounded-sm h-auto" },
        { mediaOnly: true, variant: "ghost", class: "hover:bg-transparent" },
        { mediaOnly: true, size: ["sm", "md", "lg"], class: "px-0! py-0!" },
        { fullWidth: true, mediaPosition: "left", class: "justify-start" },
        { fullWidth: true, mediaPosition: "right", class: "justify-between" },
      ],
      defaultVariants: {
        variant: "primary",
        size: "md",
        mediaOnly: false,
        fullWidth: false,
      },
    }
  ),
  text: cva("inline-flex items-center min-w-0", {
    variants: {
      fullWidth: {
        true: "flex-1",
        false: "",
      },
    },
    defaultVariants: {
      fullWidth: false,
    },
  }),
  media: cva("shrink-0 inline-flex items-center justify-center"),
};
