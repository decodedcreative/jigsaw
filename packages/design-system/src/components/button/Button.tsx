"use client";

import {
  Button as ReactAriaButton,
  type ButtonProps as ReactAriaButtonProps,
} from "react-aria-components";
import { twMerge } from "tailwind-merge";
import { useGetClassNames } from "@hooks";
import { buttonStyles } from "./Button.styles";

export type ButtonProps = ReactAriaButtonProps & {
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

  // className merges into the root slot (Mantine-style: consumers can pass
  // className for root-level overrides; classNameOverrides targets named slots)
  const rootClassName =
    typeof className === "function"
      ? className
      : twMerge(classNames.component, className);

  return (
    <ReactAriaButton className={rootClassName} {...props}>
      {children}
    </ReactAriaButton>
  );
};

Button.displayName = "DS_Button";
