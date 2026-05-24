import type { ImgHTMLAttributes } from "react";
import type { WithoutClassName } from "../../../../types/component-props";

export type AvatarImageProps = WithoutClassName<ImgHTMLAttributes<HTMLImageElement>> & {
  classNameOverrides?: Record<string, string[]>;
  onLoadingStatusChange?: (status: "loading" | "loaded" | "error") => void;
};
