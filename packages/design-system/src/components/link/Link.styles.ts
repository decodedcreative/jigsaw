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
            "text-foreground-secondary hover:text-foreground-primary no-underline hover:underline underline-offset-2",
          muted:
            "text-foreground-muted hover:text-foreground-secondary no-underline hover:underline underline-offset-2",
          brand: [
            "text-lg font-semibold text-foreground-primary",
            "no-underline hover:no-underline hover:text-foreground-primary",
            "focus-visible:ring-interactive-focus focus-visible:ring-offset-0 rounded",
          ].join(" "),
          media: [
            "text-foreground-primary no-underline hover:no-underline",
            "focus-visible:ring-interactive-focus focus-visible:ring-offset-0 rounded",
            "[&_img]:block [&_svg]:block",
          ].join(" "),
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
