import type { SearchFieldProps as ReactAriaSearchFieldProps } from "react-aria-components";
import type { ClassNameOverrides, WithoutClassName } from "@jsw-types/component-props";
import type { searchFieldStyles } from "./SearchField.styles";

export type SearchFieldProps = WithoutClassName<Omit<ReactAriaSearchFieldProps, "children">> & {
  label?: string;
  description?: string;
  placeholder?: string;
  classNameOverrides?: ClassNameOverrides<typeof searchFieldStyles>;
  size?: "sm" | "md" | "lg";
};
