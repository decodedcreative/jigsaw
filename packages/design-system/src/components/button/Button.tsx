"use client";

import {
  Button as AriaButton,
  type ButtonProps as AriaButtonProps,
} from "react-aria-components";
import { twMerge } from "tailwind-merge";
import { useGetClassNames } from "@hooks";
import { buttonStyles } from "./Button.styles";

export type ButtonProps = AriaButtonProps & {
  classNameOverrides?: Record<string, string[]>;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary" | "accent" | "outline" | "ghost" | "destructive" | "link";
};

export const Button = ({
  variant = "primary",
  size = "md",
  classNameOverrides,
  className,
  children,
  ...props
}: ButtonProps) => {
  const classNames = useGetClassNames(buttonStyles, classNameOverrides, {
    component: { variant, size },
  });

  const mergedClassName =
    typeof className === "function"
      ? className
      : twMerge(classNames.component, className);

  return (
    <AriaButton className={mergedClassName} {...props}>
      {children}
    </AriaButton>
  );
};

Button.displayName = "DS_Button";
