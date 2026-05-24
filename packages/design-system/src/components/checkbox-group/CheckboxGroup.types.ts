import type * as React from "react";
import type { CheckboxGroupProps as ReactAriaCheckboxGroupProps } from "react-aria-components";
import type { WithoutClassName } from "../../types/component-props";

export type CheckboxGroupProps = WithoutClassName<Omit<ReactAriaCheckboxGroupProps, "children">> & {
  label?: string;
  description?: string;
  errorMessage?: string;
  children?: React.ReactNode;
  classNameOverrides?: Record<string, string[]>;
};
