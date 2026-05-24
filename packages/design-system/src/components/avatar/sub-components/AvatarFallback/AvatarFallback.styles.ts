import { cva } from "class-variance-authority";

export const avatarFallbackStyles = {
  fallback: cva(
    "flex items-center justify-center w-full h-full bg-brand-primary text-foreground-inverse"
  ),
};
