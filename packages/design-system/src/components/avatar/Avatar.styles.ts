import { cva } from "class-variance-authority";

export const avatarStyles = {
  component: cva(
    [
      "relative inline-flex items-center justify-center",
      "rounded-full overflow-hidden bg-surface-secondary",
      "text-foreground-secondary font-medium uppercase",
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
};

export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
export type AvatarStatus = "online" | "offline" | "busy" | "away";
