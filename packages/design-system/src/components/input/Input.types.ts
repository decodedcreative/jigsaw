import type { VariantProps } from "class-variance-authority";
import type { TextFieldProps as ReactAriaTextFieldProps } from "react-aria-components";
import type { ClassNameOverrides } from "@jsw-types/component-props";
import type { inputStyles } from "./Input.styles";

export type InputSize = NonNullable<VariantProps<typeof inputStyles.input>["size"]>;

export type InputProps = Omit<ReactAriaTextFieldProps, "children"> & {
  label?: string;
  description?: string;
  errorMessage?: string;
  placeholder?: string;
  classNameOverrides?: ClassNameOverrides<typeof inputStyles>;
  size?: InputSize;
};
