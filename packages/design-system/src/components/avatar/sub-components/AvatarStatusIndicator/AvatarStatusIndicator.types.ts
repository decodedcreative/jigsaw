import type { HTMLAttributes } from "react";
import type { AvatarSize, AvatarStatus } from "../../Avatar.styles";
import type { WithoutClassName } from "../../../../types/component-props";

export type AvatarStatusIndicatorProps = WithoutClassName<HTMLAttributes<HTMLSpanElement>> & {
  status?: AvatarStatus;
  size?: AvatarSize;
  classNameOverrides?: Record<string, string[]>;
};
