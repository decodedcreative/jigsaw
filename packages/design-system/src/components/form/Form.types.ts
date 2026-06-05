import type { FormProps as ReactAriaFormProps } from "react-aria-components";
import type { ClassNameOverrides, WithoutClassName } from "@jsw-types/component-props";
import type { formStyles } from "./Form.styles";

export type LabelPosition = "top" | "side";

export type FormProps = WithoutClassName<ReactAriaFormProps> & {
  /** Left-align field labels in a fixed column for all labelled fields in this form. */
  labelPosition?: LabelPosition;
  classNameOverrides?: ClassNameOverrides<typeof formStyles>;
};
