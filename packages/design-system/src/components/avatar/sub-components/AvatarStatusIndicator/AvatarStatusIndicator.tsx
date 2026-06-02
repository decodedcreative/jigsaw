"use client";

import { useGetClassNames } from "@hooks";
import { useAvatarSize } from "../../Avatar.context";
import type { AvatarStatus } from "../../Avatar.types";
import { avatarStatusIndicatorStyles } from "./AvatarStatusIndicator.styles";
import type { AvatarStatusIndicatorProps } from "./AvatarStatusIndicator.types";

const statusLabels: Record<AvatarStatus, string> = {
  online: "Online",
  offline: "Offline",
  busy: "Busy",
  away: "Away",
};

export const AvatarStatusIndicator = ({
  status = "offline",
  size: sizeProp,
  classNameOverrides,
  "aria-label": ariaLabel,
  ...props
}: AvatarStatusIndicatorProps) => {
  const avatarSize = useAvatarSize();
  const size = sizeProp ?? avatarSize ?? "md";
  const classNames = useGetClassNames(avatarStatusIndicatorStyles, classNameOverrides, {
    status: { status, size },
  });

  return (
    <span
      className={classNames.status}
      aria-label={ariaLabel ?? `Status: ${statusLabels[status]}`}
      {...props}
    />
  );
};

AvatarStatusIndicator.displayName = "DS_AvatarStatusIndicator";
