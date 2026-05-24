import type { HTMLAttributes } from "react";
import type { AvatarSize } from "./Avatar.styles";
import type { WithoutClassName } from "../../types/component-props";

export type AvatarProps = WithoutClassName<HTMLAttributes<HTMLDivElement>> & {
  size?: AvatarSize;
  classNameOverrides?: Record<string, string[]>;
};
