import type { ReactNode } from "react";
import type { VariantProps } from "class-variance-authority";
import type { SelectProps as ReactAriaSelectProps } from "react-aria-components";
import type { ListBoxItemProps as ReactAriaListBoxItemProps } from "react-aria-components";
import type { ClassNameOverrides, WithoutClassName } from "@jsw-types/component-props";
import type { selectStyles } from "./Select.styles";

export type SelectSize = NonNullable<VariantProps<typeof selectStyles.trigger>["size"]>;

export type SelectItemProps = WithoutClassName<ReactAriaListBoxItemProps>;

export type SelectProps = Omit<ReactAriaSelectProps<object>, "children"> & {
  label?: string;
  description?: string;
  errorMessage?: string;
  placeholder?: string;
  children?: ReactNode;
  classNameOverrides?: ClassNameOverrides<typeof selectStyles>;
  size?: SelectSize;
};
