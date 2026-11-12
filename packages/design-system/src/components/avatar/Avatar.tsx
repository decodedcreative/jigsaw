"use client";

import { useEffect, useState } from "react";
import { getClassNames, mergeClassName } from "@utils";
import { avatarStyles } from "./Avatar.styles";
import type { AvatarProps, AvatarStatus } from "./Avatar.types";

const statusLabels: Record<AvatarStatus, string> = {
  online: "Online",
  offline: "Offline",
  busy: "Busy",
  away: "Away",
};

export const Avatar = ({
  size = "md",
  initials,
  src,
  alt,
  status,
  statusLabel,
  classNameOverrides,
  className,
  ...props
}: AvatarProps) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(false);
  }, [src]);

  const showImage = Boolean(src && !hasError);
  const showFallback = Boolean(initials && (!src || hasError));

  const classNames = getClassNames(avatarStyles, classNameOverrides, {
    component: { size },
    image: {},
    fallback: {},
    status: status ? { status, size } : {},
  });

  return (
    <div {...props} className={mergeClassName(classNames.component, className)}>
      {showImage && (
        <img
          src={src}
          alt={alt}
          className={classNames.image}
          onError={() => setHasError(true)}
        />
      )}
      {showFallback && <span className={classNames.fallback}>{initials}</span>}
      {status && (
        <span
          role="img"
          className={classNames.status}
          aria-label={statusLabel ?? `Status: ${statusLabels[status]}`}
        />
      )}
    </div>
  );
};

Avatar.displayName = "DS_Avatar";
