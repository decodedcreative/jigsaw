import type { TextFieldProps as ReactAriaTextFieldProps } from "react-aria-components";
import type { WithoutClassName } from "../../types/component-props";

export type TextareaProps = WithoutClassName<Omit<ReactAriaTextFieldProps, "children">> & {
  label?: string;
  description?: string;
  errorMessage?: string;
  placeholder?: string;
  rows?: number;
  classNameOverrides?: Record<string, string[]>;
  size?: "sm" | "md" | "lg";
};
