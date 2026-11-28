import { type HTMLAttributes, type CSSProperties } from "react";
import { getPartProps, mergeClassName } from "@utils";
import { skeletonCardStyles, skeletonStyles } from "./Skeleton.styles";
import type { SkeletonVariant } from "./Skeleton.types";
import type { ClassNameOverrides, WithoutClassName, RefProp } from "@jsw-types/component-props";

export type SkeletonProps = RefProp<HTMLDivElement> & WithoutClassName<HTMLAttributes<HTMLDivElement>> & {
  variant?: SkeletonVariant;
  width?: string | number;
  height?: string | number;
  classNameOverrides?: ClassNameOverrides<typeof skeletonStyles>;
  /**
   * Extra classes for the root element, merged last via `twMerge` (wins conflicts).
   * Intended for layout/positioning from the outside; use `classNameOverrides` for
   * internal slots.
   */
  className?: string;
};

export const Skeleton = ({
  variant = "default",
  width,
  height,
  classNameOverrides,
  className,
  style,
  ...props
}: SkeletonProps) => {
  const parts = getPartProps("skeleton", skeletonStyles, classNameOverrides, {
    component: { variant },
  });

  const inlineStyle: CSSProperties = {
    width: typeof width === "number" ? `${width}px` : width,
    height: typeof height === "number" ? `${height}px` : height,
    ...style,
  };

  return (
    <div
      {...props}
      {...parts.component}
      className={mergeClassName(parts.component.className, className)}
      style={inlineStyle}
    />
  );
};

Skeleton.displayName = "DS_Skeleton";

export const SkeletonText = (props: Omit<SkeletonProps, "variant">) => (
  <Skeleton variant="text" height={16} {...props} />
);

SkeletonText.displayName = "DS_SkeletonText";

export const SkeletonCircle = ({
  width = 40,
  height = 40,
  ...props
}: Omit<SkeletonProps, "variant">) => (
  <Skeleton variant="circular" width={width} height={height} {...props} />
);

SkeletonCircle.displayName = "DS_SkeletonCircle";

export type SkeletonCardProps = RefProp<HTMLDivElement> & WithoutClassName<HTMLAttributes<HTMLDivElement>> & {
  classNameOverrides?: ClassNameOverrides<typeof skeletonCardStyles>;
  /**
   * Extra classes for the root element, merged last via `twMerge` (wins conflicts).
   */
  className?: string;
};

export const SkeletonCard = ({ classNameOverrides, className, ...props }: SkeletonCardProps) => {
  const parts = getPartProps("skeleton-card", skeletonCardStyles, classNameOverrides);

  return (
    <div {...props} {...parts.component} className={mergeClassName(parts.component.className, className)}>
      <Skeleton width="100%" height={200} />
      <SkeletonText width="80%" />
      <SkeletonText width="60%" />
    </div>
  );
};

SkeletonCard.displayName = "DS_SkeletonCard";
