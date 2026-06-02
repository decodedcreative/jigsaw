"use client";

import { useGetClassNames } from "@hooks";
import { AvatarSizeProvider } from "./Avatar.context";
import { avatarStyles } from "./Avatar.styles";
import type { AvatarProps } from "./Avatar.types";

export const Avatar = ({ size = "md", classNameOverrides, children, ...props }: AvatarProps) => {
  const classNames = useGetClassNames(avatarStyles, classNameOverrides, {
    component: { size },
  });

  return (
    <AvatarSizeProvider value={size}>
      <div className={classNames.component} {...props}>
        {children}
      </div>
    </AvatarSizeProvider>
  );
};

Avatar.displayName = "DS_Avatar";
