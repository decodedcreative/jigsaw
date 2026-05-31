"use client";

import {
  Button as ReactAriaButton,
  type ButtonProps as ReactAriaButtonProps,
} from "react-aria-components";
import { useGetClassNames } from "@hooks";
import type { ClassNameOverrides } from "@ds-types/component-props";
import { buttonStyles } from "./Button.styles";

export type ButtonProps = Omit<ReactAriaButtonProps, "className"> & {
  classNameOverrides?: ClassNameOverrides<typeof buttonStyles>;
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
    <ReactAriaButton className={classNames.component} {...props}>
      {children}
    </ReactAriaButton>
  );
};

Button.displayName = "DS_Button";
