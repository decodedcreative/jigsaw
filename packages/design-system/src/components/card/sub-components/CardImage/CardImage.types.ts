import type { HTMLAttributes } from "react";
import type { WithoutClassName } from "../../../../types/component-props";

export type CardImageProps = WithoutClassName<HTMLAttributes<HTMLImageElement>> & {
  src: string;
  alt: string;
  classNameOverrides?: Record<string, string[]>;
};
