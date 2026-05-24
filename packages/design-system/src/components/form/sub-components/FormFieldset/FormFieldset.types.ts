import type { ComponentPropsWithoutRef, ReactNode } from "react";
import type { WithoutClassName } from "../../../../types/component-props";

export type FormFieldsetProps = WithoutClassName<ComponentPropsWithoutRef<"div">> & {
  /** Accessible name for the field group, exposed to assistive technologies. */
  label?: string;
  children?: ReactNode;
  classNameOverrides?: Record<string, string[]>;
};
