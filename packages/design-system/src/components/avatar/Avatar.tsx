"use client";

import type { FC } from "react";
import { useGetClassNames } from "@hooks";
import { avatarStyles } from "./Avatar.styles";
import type { AvatarProps } from "./Avatar.types";

export const Avatar: FC<AvatarProps> = ({ size = "md", classNameOverrides, children, ...props }: AvatarProps) => {
  const classNames = useGetClassNames(avatarStyles, classNameOverrides, {
    component: { size },
  });

  return (
    <div className={classNames.component} {...props}>
      {children}
    </div>
  );
};

Avatar.displayName = "DS_Avatar";
