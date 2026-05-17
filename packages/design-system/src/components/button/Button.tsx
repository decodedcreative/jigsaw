"use client";

import {
  Button as AriaButton,
  type ButtonProps as AriaButtonProps,
} from "react-aria-components";
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
  children,
  ...props
}: ButtonProps) => {
  const classNames = useGetClassNames(buttonStyles, classNameOverrides, {
    component: { variant, size },
  });

  return (
    <AriaButton className={classNames.component} {...props}>
      {children}
    </AriaButton>
  );
};

Button.displayName = "DS_Button";
