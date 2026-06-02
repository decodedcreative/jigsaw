import type { HTMLAttributes } from "react";
import type { ClassNameOverrides, WithoutClassName } from "@jsw-types/component-props";
import type { AvatarSize, AvatarStatus } from "../../Avatar.types";
import type { avatarStatusIndicatorStyles } from "./AvatarStatusIndicator.styles";

export type AvatarStatusIndicatorProps = WithoutClassName<HTMLAttributes<HTMLSpanElement>> & {
  status?: AvatarStatus;
  size?: AvatarSize;
  classNameOverrides?: ClassNameOverrides<typeof avatarStatusIndicatorStyles>;
};
