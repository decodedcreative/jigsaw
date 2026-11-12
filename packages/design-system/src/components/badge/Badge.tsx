import { type HTMLAttributes } from "react";
import { getClassNames, mergeClassName } from "@utils";
import { badgeStyles } from "./Badge.styles";
import type { BadgeVariant, BadgeSize } from "./Badge.types";
import type { ClassNameOverrides, WithoutClassName } from "@jsw-types/component-props";

export type BadgeProps = WithoutClassName<HTMLAttributes<HTMLSpanElement>> & {
  variant?: BadgeVariant;
  size?: BadgeSize;
  classNameOverrides?: ClassNameOverrides<typeof badgeStyles>;
  /**
   * Extra classes for the root element, merged last via `twMerge` (wins conflicts).
   * Intended for layout/positioning from the outside; use `classNameOverrides` for
   * internal slots.
   */
  className?: string;
};

export const Badge = ({
  variant = "default",
  size = "md",
  classNameOverrides,
  className,
  children,
  ...props
}: BadgeProps) => {
  const classNames = getClassNames(badgeStyles, classNameOverrides, {
    component: { variant, size },
  });

  return (
    <span {...props} className={mergeClassName(classNames.component, className)}>
      {children}
    </span>
  );
};

Badge.displayName = "DS_Badge";
