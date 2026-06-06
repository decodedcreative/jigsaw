import type { TextFieldProps as ReactAriaTextFieldProps } from "react-aria-components";
import type { ClassNameOverrides, WithoutClassName } from "@jsw-types/component-props";
import type { inputStyles } from "./Input.styles";

export type InputProps = WithoutClassName<Omit<ReactAriaTextFieldProps, "children">> & {
  label?: string;
  description?: string;
  errorMessage?: string;
  placeholder?: string;
  classNameOverrides?: ClassNameOverrides<typeof inputStyles>;
  size?: "sm" | "md" | "lg";
};
