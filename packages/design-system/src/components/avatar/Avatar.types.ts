import type { HTMLAttributes } from "react";
import type { ClassNameOverrides, WithoutClassName } from "@jsw-types/component-props";
import type { avatarStyles } from "./Avatar.styles";

export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
export type AvatarStatus = "online" | "offline" | "busy" | "away";

export type AvatarProps = WithoutClassName<HTMLAttributes<HTMLDivElement>> & {
  size?: AvatarSize;
  /** Initials shown when there is no image, or when the image fails to load. */
  initials?: string;
  src?: string;
  alt?: string;
  status?: AvatarStatus;
  /** Override the default status aria-label (e.g. "Status: Online"). */
  statusLabel?: string;
  classNameOverrides?: ClassNameOverrides<typeof avatarStyles>;
};
