"use client";

import { type FC,  useState } from "react";
import { useGetClassNames } from "@hooks";
import { avatarImageStyles } from "./AvatarImage.styles";
import type { AvatarImageProps } from "./AvatarImage.types";

export const AvatarImage: FC<AvatarImageProps> = ({
  classNameOverrides,
  onLoadingStatusChange,
  src,
  alt,
  ...props
}: AvatarImageProps) => {
  const [hasError, setHasError] = useState(false);
  const classNames = useGetClassNames(avatarImageStyles, classNameOverrides, { image: {} });

  if (hasError || !src) return null;

  return (
    <img
      src={src}
      alt={alt}
      className={classNames.image}
      onLoad={() => onLoadingStatusChange?.("loaded")}
      onError={() => {
        setHasError(true);
        onLoadingStatusChange?.("error");
      }}
      {...props}
    />
  );
};

AvatarImage.displayName = "DS_AvatarImage";
