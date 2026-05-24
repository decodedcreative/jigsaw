import type { NumberFieldProps as ReactAriaNumberFieldProps } from "react-aria-components";
import type { WithoutClassName } from "../../types/component-props";

export type NumberFieldProps = WithoutClassName<Omit<ReactAriaNumberFieldProps, "children">> & {
  label?: string;
  description?: string;
  errorMessage?: string;
  classNameOverrides?: Record<string, string[]>;
  size?: "sm" | "md" | "lg";
};
