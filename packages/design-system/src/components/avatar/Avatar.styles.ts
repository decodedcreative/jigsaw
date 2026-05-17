import { cva } from "class-variance-authority";

export const avatarStyles = {
  root: cva(
    [
      "relative inline-flex items-center justify-center",
      "rounded-full overflow-hidden bg-surface-secondary",
      "text-text-secondary font-medium uppercase",
    ],
    {
      variants: {
        size: {
          xs: "w-6 h-6 text-xs",
          sm: "w-8 h-8 text-sm",
          md: "w-10 h-10 text-base",
          lg: "w-12 h-12 text-lg",
          xl: "w-16 h-16 text-xl",
          "2xl": "w-24 h-24 text-2xl",
        },
      },
      defaultVariants: {
        size: "md",
      },
    }
  ),
  image: cva("w-full h-full object-cover"),
  fallback: cva(
    "flex items-center justify-center w-full h-full bg-brand-primary text-text-inverse"
  ),
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
          offline: "bg-text-tertiary",
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

export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
export type AvatarStatus = "online" | "offline" | "busy" | "away";
