import type { FormProps as ReactAriaFormProps } from "react-aria-components";
import type { ClassNameOverrides } from "@jsw-types/component-props";
import type { formStyles } from "./Form.styles";

export type LabelPosition = "top" | "side";

export type FormProps = ReactAriaFormProps & {
  /** Place field labels in a fixed left column (right-aligned) beside their controls. */
  labelPosition?: LabelPosition;
  classNameOverrides?: ClassNameOverrides<typeof formStyles>;
};
