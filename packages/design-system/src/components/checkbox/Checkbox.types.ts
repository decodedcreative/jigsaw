import type * as React from "react";
import type { CheckboxProps as ReactAriaCheckboxProps } from "react-aria-components";
import type { WithoutClassName } from "../../types/component-props";

export type CheckboxProps = WithoutClassName<Omit<ReactAriaCheckboxProps, "children">> & {
  label?: string;
  description?: string;
  children?: React.ReactNode;
  classNameOverrides?: Record<string, string[]>;
  size?: "sm" | "md" | "lg";
  hasError?: boolean;
};
