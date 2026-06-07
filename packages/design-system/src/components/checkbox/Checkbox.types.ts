import type { ReactNode } from "react";
import type { VariantProps } from "class-variance-authority";
import type { CheckboxFieldProps as ReactAriaCheckboxFieldProps } from "react-aria-components";
import type { ClassNameOverrides } from "@jsw-types/component-props";
import type { checkboxStyles } from "./Checkbox.styles";

export type CheckboxSize = NonNullable<VariantProps<typeof checkboxStyles.box>["size"]>;

export type CheckboxProps = Omit<ReactAriaCheckboxFieldProps, "children"> & {
  label?: string;
  description?: string;
  children?: ReactNode;
  classNameOverrides?: ClassNameOverrides<typeof checkboxStyles>;
  size?: CheckboxSize;
  hasError?: boolean;
};
