import type { ComponentPropsWithoutRef, ReactNode } from "react";
import type { ClassNameOverrides, WithoutClassName } from "@jsw-types/component-props";
import type { formGroupStyles } from "./FormGroup.styles";

export type FormGroupClassNameOverrides = ClassNameOverrides<typeof formGroupStyles> & {
  /** Extra classes for the section Heading. */
  title?: string;
};

export type FormGroupProps = WithoutClassName<ComponentPropsWithoutRef<"section">> & {
  /**
   * Section title (visual + `aria-labelledby` on the section).
   * Layout only — field labels live on Input, Select, CheckboxGroup, etc.
   */
  title?: string;
  children?: ReactNode;
  classNameOverrides?: FormGroupClassNameOverrides;
};
