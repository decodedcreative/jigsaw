import type { SearchFieldProps as ReactAriaSearchFieldProps } from "react-aria-components";
import type { WithoutClassName } from "../../types/component-props";

export type SearchFieldProps = WithoutClassName<Omit<ReactAriaSearchFieldProps, "children">> & {
  label?: string;
  description?: string;
  placeholder?: string;
  classNameOverrides?: Record<string, string[]>;
  size?: "sm" | "md" | "lg";
};
