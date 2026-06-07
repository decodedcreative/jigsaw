import type { ReactNode } from "react";
import type { VariantProps } from "class-variance-authority";
import type { RadioFieldProps as ReactAriaRadioFieldProps } from "react-aria-components";
import type { ClassNameOverrides, WithoutClassName } from "@jsw-types/component-props";
import type { radioStyles } from "./RadioGroupItem.styles";

export type RadioGroupItemClassNameOverrides = ClassNameOverrides<typeof radioStyles>;

export type RadioSize = NonNullable<VariantProps<typeof radioStyles.circle>["size"]>;

export type RadioItemProps = WithoutClassName<Omit<ReactAriaRadioFieldProps, "children">> & {
  label?: string;
  description?: string;
  children?: ReactNode;
  size?: RadioSize;
  hasError?: boolean;
};
