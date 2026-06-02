import type { HTMLAttributes } from "react";
import type { ClassNameOverrides, WithoutClassName } from "@jsw-types/component-props";
import type { avatarStyles } from "./Avatar.styles";

export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
export type AvatarStatus = "online" | "offline" | "busy" | "away";

type AvatarSharedProps = WithoutClassName<HTMLAttributes<HTMLDivElement>> & {
  size?: AvatarSize;
  /**
   * Initials shown when there is no image, or when the image fails to load.
   * Provide when using `src` so users still see a fallback if the image errors.
   */
  initials?: string;
  status?: AvatarStatus;
  /** Override the default status aria-label (e.g. "Status: Online"). */
  statusLabel?: string;
  classNameOverrides?: ClassNameOverrides<typeof avatarStyles>;
};

/** Image avatar — `alt` is required whenever `src` is set. */
type AvatarWithImage = AvatarSharedProps & {
  src: string;
  alt: string;
};

/** Initials, status-only, or empty placeholder (no photo). */
type AvatarWithoutImage = AvatarSharedProps & {
  src?: never;
  alt?: never;
};

/**
 * Prop-driven avatar.
 *
 * - No props: empty placeholder circle (`bg-surface-secondary`).
 * - `initials` only: initials fallback.
 * - `src` + `alt`: photo; pass `initials` for error fallback.
 * - `status`: presence dot; sizes with `size`.
 */
export type AvatarProps = AvatarWithImage | AvatarWithoutImage;
