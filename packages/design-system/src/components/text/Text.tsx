import * as React from "react";
import { getClassNames, mergeClassName } from "@utils";
import { textStyles } from "./Text.styles";
import type { ClassNameOverrides, WithoutClassName } from "@jsw-types/component-props";

export type TextProps = WithoutClassName<
  Omit<React.HTMLAttributes<HTMLParagraphElement>, "children">
> & {
  as?: "p" | "span";
  children: React.ReactNode;
  classNameOverrides?: ClassNameOverrides<typeof textStyles>;
  /**
   * Extra classes for the root element, merged last via `twMerge` (wins conflicts).
   * Intended for layout/positioning from the outside; use `classNameOverrides` for
   * internal slots.
   */
  className?: string;
  muted?: boolean;
  size?: "xs" | "sm" | "base" | "lg";
  weight?: "normal" | "medium" | "semibold" | "bold";
};

export const Text = ({
  as: Component = "p",
  size = "base",
  weight = "normal",
  muted = false,
  classNameOverrides = undefined,
  className,
  children,
  ...props
}: TextProps) => {
  const classNames = getClassNames(
    textStyles,
    classNameOverrides ?? {},
    { component: { size, weight, muted } }
  );

  return (
    <Component {...props} className={mergeClassName(classNames.component, className)}>
      {children}
    </Component>
  );
};

Text.displayName = "DS_Text";
