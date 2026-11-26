import type { VariantProps } from "class-variance-authority";
import type { NumberFieldProps as ReactAriaNumberFieldProps } from "react-aria-components";
import type { ClassNameOverrides, RefProp } from "@jsw-types/component-props";
import type { numberFieldStyles } from "./NumberField.styles";

export type NumberFieldSize = NonNullable<VariantProps<typeof numberFieldStyles.input>["size"]>;

export type NumberFieldProps = RefProp<HTMLDivElement> & Omit<ReactAriaNumberFieldProps, "children"> & {
  label?: string;
  description?: string;
  errorMessage?: string;
  classNameOverrides?: ClassNameOverrides<typeof numberFieldStyles>;
  size?: NumberFieldSize;
};
