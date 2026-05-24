"use client";

import type { FC } from "react";
import { useGetClassNames } from "@hooks";
import { avatarFallbackStyles } from "./AvatarFallback.styles";
import type { AvatarFallbackProps } from "./AvatarFallback.types";

export const AvatarFallback: FC<AvatarFallbackProps> = ({ classNameOverrides, children, ...props }: AvatarFallbackProps) => {
  const classNames = useGetClassNames(avatarFallbackStyles, classNameOverrides, { fallback: {} });

  return (
    <span className={classNames.fallback} {...props}>
      {children}
    </span>
  );
};

AvatarFallback.displayName = "DS_AvatarFallback";
