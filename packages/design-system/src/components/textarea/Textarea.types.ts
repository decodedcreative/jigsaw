import type { VariantProps } from "class-variance-authority";
import type { TextFieldProps as ReactAriaTextFieldProps } from "react-aria-components";
import type { ClassNameOverrides } from "@jsw-types/component-props";
import type { textareaStyles } from "./Textarea.styles";

export type TextareaSize = NonNullable<VariantProps<typeof textareaStyles.textarea>["size"]>;

export type TextareaProps = Omit<ReactAriaTextFieldProps, "children"> & {
  label?: string;
  description?: string;
  errorMessage?: string;
  placeholder?: string;
  rows?: number;
  classNameOverrides?: ClassNameOverrides<typeof textareaStyles>;
  size?: TextareaSize;
};
