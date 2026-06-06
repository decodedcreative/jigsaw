import type { TextFieldProps as ReactAriaTextFieldProps } from "react-aria-components";
import type { ClassNameOverrides, WithoutClassName } from "@jsw-types/component-props";
import type { textareaStyles } from "./Textarea.styles";

export type TextareaProps = WithoutClassName<Omit<ReactAriaTextFieldProps, "children">> & {
  label?: string;
  description?: string;
  errorMessage?: string;
  placeholder?: string;
  rows?: number;
  classNameOverrides?: ClassNameOverrides<typeof textareaStyles>;
  size?: "sm" | "md" | "lg";
};
