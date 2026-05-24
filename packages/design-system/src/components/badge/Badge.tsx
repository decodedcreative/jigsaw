"use client";

import type { FC } from "react";
import { useGetClassNames } from "@hooks";
import { badgeStyles } from "./Badge.styles";
import type { BadgeProps } from "./Badge.types";

export const Badge: FC<BadgeProps> = ({
  variant = "default",
  size = "md",
  classNameOverrides,
  children,
  ...props
}) => {
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
