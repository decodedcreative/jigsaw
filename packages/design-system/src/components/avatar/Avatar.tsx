"use client";

import { useState, type HTMLAttributes, type ImgHTMLAttributes } from "react";
import { useGetClassNames } from "@hooks";
import { avatarStyles, type AvatarSize, type AvatarStatus } from "./Avatar.styles";

export type AvatarProps = HTMLAttributes<HTMLDivElement> & {
  size?: AvatarSize;
  classNameOverrides?: Record<string, string[]>;
};

export const Avatar = ({ size = "md", classNameOverrides, children, ...props }: AvatarProps) => {
  const classNames = useGetClassNames(avatarStyles, classNameOverrides, {
    root: { size },
    image: {},
    fallback: {},
    status: { size },
  });

  return (
    <div className={classNames.root} {...props}>
      {children}
    </div>
  );
};

Avatar.displayName = "DS_Avatar";

export type AvatarImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  classNameOverrides?: Record<string, string[]>;
  onLoadingStatusChange?: (status: "loading" | "loaded" | "error") => void;
};

export const AvatarImage = ({
  classNameOverrides,
  onLoadingStatusChange,
  src,
  alt,
  ...props
}: AvatarImageProps) => {
  const [hasError, setHasError] = useState(false);
  const classNames = useGetClassNames(avatarStyles, classNameOverrides, { image: {} });

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

export type AvatarFallbackProps = HTMLAttributes<HTMLSpanElement> & {
  classNameOverrides?: Record<string, string[]>;
};

export const AvatarFallback = ({ classNameOverrides, children, ...props }: AvatarFallbackProps) => {
  const classNames = useGetClassNames(avatarStyles, classNameOverrides, { fallback: {} });

  return (
    <span className={classNames.fallback} {...props}>
      {children}
    </span>
  );
};

AvatarFallback.displayName = "DS_AvatarFallback";

export type AvatarStatusIndicatorProps = HTMLAttributes<HTMLSpanElement> & {
  status?: AvatarStatus;
  size?: AvatarSize;
  classNameOverrides?: Record<string, string[]>;
};

export const AvatarStatusIndicator = ({
  status = "offline",
  size = "md",
  classNameOverrides,
  ...props
}: AvatarStatusIndicatorProps) => {
  const classNames = useGetClassNames(avatarStyles, classNameOverrides, {
    status: { status, size },
  });

  return <span className={classNames.status} {...props} />;
};

AvatarStatusIndicator.displayName = "DS_AvatarStatusIndicator";
