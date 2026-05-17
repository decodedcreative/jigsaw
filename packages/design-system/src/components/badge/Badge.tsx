"use client";

import { type HTMLAttributes } from "react";
import { useGetClassNames } from "@hooks";
import { badgeStyles, type BadgeVariant, type BadgeSize } from "./Badge.styles";

export type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: BadgeVariant;
  size?: BadgeSize;
  classNameOverrides?: Record<string, string[]>;
};

export const Badge = ({
  variant = "default",
  size = "md",
  classNameOverrides,
  children,
  ...props
}: BadgeProps) => {
  const classNames = useGetClassNames(badgeStyles, classNameOverrides, {
    root: { variant, size },
  });

  return (
    <span className={classNames.root} {...props}>
      {children}
    </span>
  );
};

Badge.displayName = "DS_Badge";
