import type { FormProps as ReactAriaFormProps } from "react-aria-components";
import type { ClassNameOverrides, WithoutClassName } from "@jsw-types/component-props";
import type { formStyles } from "./Form.styles";

export type FormProps = WithoutClassName<ReactAriaFormProps> & {
  classNameOverrides?: ClassNameOverrides<typeof formStyles>;
};
