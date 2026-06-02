import { cva } from "class-variance-authority";

export const avatarFallbackStyles = {
  fallback: cva(
    "absolute inset-0 flex items-center justify-center w-full h-full bg-brand-primary text-foreground-inverse"
  ),
};
