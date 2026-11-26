import type { VariantProps } from "class-variance-authority";
import type { SearchFieldProps as ReactAriaSearchFieldProps } from "react-aria-components";
import type { ClassNameOverrides, RefProp } from "@jsw-types/component-props";
import type { searchFieldStyles } from "./SearchField.styles";

export type SearchFieldSize = NonNullable<VariantProps<typeof searchFieldStyles.input>["size"]>;

export type SearchFieldProps = RefProp<HTMLDivElement> & Omit<ReactAriaSearchFieldProps, "children"> & {
  /**
   * Visible label. Without one (and without `aria-label` / `aria-labelledby`),
   * the field is named "Search" for assistive technology.
   */
  label?: string;
  description?: string;
  errorMessage?: string;
  placeholder?: string;
  classNameOverrides?: ClassNameOverrides<typeof searchFieldStyles>;
  size?: SearchFieldSize;
};
