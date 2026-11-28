import { type HTMLAttributes } from "react";
import { getPartProps, mergeClassName } from "@utils";
import { badgeStyles } from "./Badge.styles";
import type { BadgeVariant, BadgeSize } from "./Badge.types";
import type { ClassNameOverrides, WithoutClassName, RefProp } from "@jsw-types/component-props";

export type BadgeProps = RefProp<HTMLSpanElement> & WithoutClassName<HTMLAttributes<HTMLSpanElement>> & {
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
  const parts = getPartProps("badge", badgeStyles, classNameOverrides, {
    component: { variant, size },
  });

  return (
    <span {...props} {...parts.component} className={mergeClassName(parts.component.className, className)}>
      {children}
    </span>
  );
};

Badge.displayName = "DS_Badge";
