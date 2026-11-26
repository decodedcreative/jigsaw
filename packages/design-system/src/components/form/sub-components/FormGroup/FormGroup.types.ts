import type { ComponentPropsWithoutRef, ReactNode } from "react";
import type { HeadingLevel } from "@components/heading/Heading.types";
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
  /**
   * Heading element for the title. Defaults to `h3`.
   * Pick the level that follows the page's heading outline, e.g. `h2` directly under the page `h1`.
   */
  titleAs?: HeadingLevel;
  children?: ReactNode;
  classNameOverrides?: FormGroupClassNameOverrides;
  /** Extra classes for the root `<section>`, merged last via `twMerge` (wins conflicts). */
  className?: string;
};
