import type { FormProps as ReactAriaFormProps } from "react-aria-components";
import type { WithoutClassName } from "../../types/component-props";

export type FormProps = WithoutClassName<ReactAriaFormProps> & {
  classNameOverrides?: Record<string, string[]>;
};
