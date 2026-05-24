import type * as React from "react";
import type { SelectProps as ReactAriaSelectProps } from "react-aria-components";
import type { WithoutClassName } from "../../types/component-props";

export type SelectProps<T extends object> = Omit<ReactAriaSelectProps<T>, "children"> & {
  label?: string;
  description?: string;
  errorMessage?: string;
  placeholder?: string;
  items?: Iterable<T>;
  children?: React.ReactNode | ((item: T) => React.ReactNode);
  classNameOverrides?: Record<string, string[]>;
  size?: "sm" | "md" | "lg";
};
