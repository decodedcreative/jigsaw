"use client";

import { useEffect, useState } from "react";
import { useGetClassNames } from "@hooks";
import { avatarImageStyles } from "./AvatarImage.styles";
import type { AvatarImageProps } from "./AvatarImage.types";

export const AvatarImage = ({
  classNameOverrides,
  onLoadingStatusChange,
  src,
  alt,
  ...props
}: AvatarImageProps) => {
  const [hasError, setHasError] = useState(false);
  const classNames = useGetClassNames(avatarImageStyles, classNameOverrides, { image: {} });

  useEffect(() => {
    if (!src || hasError) return;
    onLoadingStatusChange?.("loading");
  }, [src, hasError, onLoadingStatusChange]);

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
