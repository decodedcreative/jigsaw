import type { ReactNode } from "react";
import type { VariantProps } from "class-variance-authority";
import type { SelectProps as ReactAriaSelectProps } from "react-aria-components";
import type { ListBoxItemProps as ReactAriaListBoxItemProps } from "react-aria-components";
import type { ClassNameOverrides } from "@jsw-types/component-props";
import type { selectStyles } from "./Select.styles";

export type SelectSize = NonNullable<VariantProps<typeof selectStyles.trigger>["size"]>;

/**
 * `className` targets the option root and is merged last. Shared item styling for every
 * option lives on the parent Select's `classNameOverrides.item`.
 */
export type SelectItemProps = ReactAriaListBoxItemProps;

export type SelectProps = Omit<ReactAriaSelectProps<object>, "children"> & {
  label?: string;
  description?: string;
  errorMessage?: string;
  placeholder?: string;
  children?: ReactNode;
  classNameOverrides?: ClassNameOverrides<typeof selectStyles>;
  size?: SelectSize;
};
