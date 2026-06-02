import type { HTMLAttributes } from "react";
import type { ClassNameOverrides, WithoutClassName } from "@jsw-types/component-props";
import type { avatarStyles } from "./Avatar.styles";

export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
export type AvatarStatus = "online" | "offline" | "busy" | "away";

export type AvatarProps = WithoutClassName<HTMLAttributes<HTMLDivElement>> & {
  size?: AvatarSize;
  classNameOverrides?: ClassNameOverrides<typeof avatarStyles>;
};
