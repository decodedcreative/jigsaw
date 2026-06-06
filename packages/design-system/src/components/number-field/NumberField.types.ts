import type { NumberFieldProps as ReactAriaNumberFieldProps } from "react-aria-components";
import type { ClassNameOverrides, WithoutClassName } from "@jsw-types/component-props";
import type { numberFieldStyles } from "./NumberField.styles";

export type NumberFieldProps = WithoutClassName<Omit<ReactAriaNumberFieldProps, "children">> & {
  label?: string;
  description?: string;
  errorMessage?: string;
  classNameOverrides?: ClassNameOverrides<typeof numberFieldStyles>;
  size?: "sm" | "md" | "lg";
};
