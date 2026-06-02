import type { ImgHTMLAttributes } from "react";
import type { ClassNameOverrides, WithoutClassName } from "@jsw-types/component-props";
import type { avatarImageStyles } from "./AvatarImage.styles";

export type AvatarImageProps = WithoutClassName<ImgHTMLAttributes<HTMLImageElement>> & {
  classNameOverrides?: ClassNameOverrides<typeof avatarImageStyles>;
  onLoadingStatusChange?: (status: "loading" | "loaded" | "error") => void;
};
