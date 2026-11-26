import type { ReactNode } from "react";
import type { CheckboxGroupProps as ReactAriaCheckboxGroupProps } from "react-aria-components";
import type { ClassNameOverrides, RefProp } from "@jsw-types/component-props";
import type { checkboxGroupStyles } from "./CheckboxGroup.styles";

export type CheckboxGroupProps = RefProp<HTMLDivElement> & Omit<ReactAriaCheckboxGroupProps, "children"> & {
  label?: string;
  description?: string;
  errorMessage?: string;
  children?: ReactNode;
  classNameOverrides?: ClassNameOverrides<typeof checkboxGroupStyles>;
};
