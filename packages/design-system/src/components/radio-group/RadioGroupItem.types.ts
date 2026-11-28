import type { ReactNode } from "react";
import type { VariantProps } from "class-variance-authority";
import type { RadioFieldProps as ReactAriaRadioFieldProps } from "react-aria-components";
import type { ClassNameOverrides, RefProp } from "@jsw-types/component-props";
import type { radioGroupItemStyles } from "./RadioGroupItem.styles";

export type RadioGroupItemClassNameOverrides = ClassNameOverrides<typeof radioGroupItemStyles>;

export type RadioSize = NonNullable<VariantProps<typeof radioGroupItemStyles.circle>["size"]>;

/**
 * `className` (string or render-prop function) targets the root RadioField and is merged
 * last. Item internals are styled via the group's `classNameOverrides.item`.
 */
export type RadioItemProps = RefProp<HTMLDivElement> & Omit<ReactAriaRadioFieldProps, "children"> & {
  label?: string;
  description?: string;
  children?: ReactNode;
  size?: RadioSize;
  hasError?: boolean;
};
