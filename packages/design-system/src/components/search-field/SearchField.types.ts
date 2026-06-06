import type { VariantProps } from "class-variance-authority";
import type { SearchFieldProps as ReactAriaSearchFieldProps } from "react-aria-components";
import type { ClassNameOverrides } from "@jsw-types/component-props";
import type { searchFieldStyles } from "./SearchField.styles";

export type SearchFieldSize = NonNullable<VariantProps<typeof searchFieldStyles.input>["size"]>;

export type SearchFieldProps = Omit<ReactAriaSearchFieldProps, "children"> & {
  label?: string;
  description?: string;
  errorMessage?: string;
  placeholder?: string;
  classNameOverrides?: ClassNameOverrides<typeof searchFieldStyles>;
  size?: SearchFieldSize;
};
