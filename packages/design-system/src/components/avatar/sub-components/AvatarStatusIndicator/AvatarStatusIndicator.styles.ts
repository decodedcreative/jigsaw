import { cva } from "class-variance-authority";

export const avatarStatusIndicatorStyles = {
  status: cva(
    ["absolute bottom-0 right-0 rounded-full border-2 border-surface-primary"],
    {
      variants: {
        size: {
          xs: "w-1.5 h-1.5",
          sm: "w-2 h-2",
          md: "w-2.5 h-2.5",
          lg: "w-3 h-3",
          xl: "w-4 h-4",
          "2xl": "w-5 h-5",
        },
        status: {
          online: "bg-state-success-text",
          offline: "bg-foreground-tertiary",
          busy: "bg-state-error-text",
          away: "bg-state-warning-text",
        },
      },
      defaultVariants: {
        size: "md",
        status: "offline",
      },
    }
  ),
};
