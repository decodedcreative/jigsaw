import type { VariantProps } from "class-variance-authority";
import type { TextFieldProps as ReactAriaTextFieldProps } from "react-aria-components";
import type { ClassNameOverrides, RefProp } from "@jsw-types/component-props";
import type { inputStyles } from "./Input.styles";

export type InputSize = NonNullable<VariantProps<typeof inputStyles.input>["size"]>;

export type InputProps = RefProp<HTMLDivElement> & Omit<ReactAriaTextFieldProps, "children"> & {
  label?: string;
  description?: string;
  errorMessage?: string;
  placeholder?: string;
  classNameOverrides?: ClassNameOverrides<typeof inputStyles>;
  size?: InputSize;
};
