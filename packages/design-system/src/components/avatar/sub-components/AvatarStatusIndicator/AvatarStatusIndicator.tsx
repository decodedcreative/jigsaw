"use client";

import type { FC } from "react";
import { useGetClassNames } from "@hooks";
import { avatarStatusIndicatorStyles } from "./AvatarStatusIndicator.styles";
import type { AvatarStatusIndicatorProps } from "./AvatarStatusIndicator.types";

export const AvatarStatusIndicator: FC<AvatarStatusIndicatorProps> = ({
  status = "offline",
  size = "md",
  classNameOverrides,
  ...props
}: AvatarStatusIndicatorProps) => {
  const classNames = useGetClassNames(avatarStatusIndicatorStyles, classNameOverrides, {
    status: { status, size },
  });

  return <span className={classNames.status} {...props} />;
};

AvatarStatusIndicator.displayName = "DS_AvatarStatusIndicator";
