import type * as React from "react";
import type { RadioGroupProps as ReactAriaRadioGroupProps } from "react-aria-components";
import type { WithoutClassName } from "../../types/component-props";

export type RadioGroupProps = WithoutClassName<Omit<ReactAriaRadioGroupProps, "children">> & {
  label?: string;
  description?: string;
  errorMessage?: string;
  children?: React.ReactNode;
  classNameOverrides?: Record<string, string[]>;
};
