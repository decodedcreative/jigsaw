import type { HTMLAttributes } from "react";
import type { SkeletonVariant } from "./Skeleton.styles";
import type { WithoutClassName } from "../../types/component-props";

export type SkeletonProps = WithoutClassName<HTMLAttributes<HTMLDivElement>> & {
  variant?: SkeletonVariant;
  width?: string | number;
  height?: string | number;
  classNameOverrides?: Record<string, string[]>;
};
