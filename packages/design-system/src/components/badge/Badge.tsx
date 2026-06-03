"use client";

import { type HTMLAttributes } from "react";
import { useGetClassNames } from "@hooks";
import { badgeStyles } from "./Badge.styles";
import type { BadgeVariant, BadgeSize } from "./Badge.types";
import type { ClassNameOverrides, WithoutClassName } from "@jsw-types/component-props";

export type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: BadgeVariant;
  size?: BadgeSize;
  classNameOverrides?: ClassNameOverrides<typeof badgeStyles>;
};

export const Badge = ({
  variant = "default",
  size = "md",
  classNameOverrides,
  children,
  ...props
}: BadgeProps) => {
  const classNames = useGetClassNames(badgeStyles, classNameOverrides, {
    component: { variant, size },
  });

  return (
    <span className={classNames.component} {...props}>
      {children}
    </span>
  );
};

Badge.displayName = "DS_Badge";
