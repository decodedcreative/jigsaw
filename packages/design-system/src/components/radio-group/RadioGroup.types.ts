import type { ReactNode } from "react";
import type { RadioGroupProps as ReactAriaRadioGroupProps } from "react-aria-components";
import type { ClassNameOverrides, RefProp } from "@jsw-types/component-props";
import type { radioGroupStyles } from "./RadioGroup.styles";
import type { RadioGroupItemClassNameOverrides } from "./RadioGroupItem.types";

export type RadioGroupClassNameOverrides = ClassNameOverrides<typeof radioGroupStyles> & {
  item?: RadioGroupItemClassNameOverrides;
};

export type RadioGroupProps = RefProp<HTMLDivElement> & Omit<ReactAriaRadioGroupProps, "children"> & {
  label?: string;
  description?: string;
  errorMessage?: string;
  children?: ReactNode;
  classNameOverrides?: RadioGroupClassNameOverrides;
};
