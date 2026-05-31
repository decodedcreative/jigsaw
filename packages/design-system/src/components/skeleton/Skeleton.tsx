"use client";

import { type HTMLAttributes, type CSSProperties } from "react";
import { useGetClassNames } from "@hooks";
import { skeletonStyles, type SkeletonVariant } from "./Skeleton.styles";
import type { ClassNameOverrides, WithoutClassName } from "@jsw-types/component-props";

export type SkeletonProps = HTMLAttributes<HTMLDivElement> & {
  variant?: SkeletonVariant;
  width?: string | number;
  height?: string | number;
  classNameOverrides?: ClassNameOverrides<typeof skeletonStyles>;
};

export const Skeleton = ({
  variant = "default",
  width,
  height,
  classNameOverrides,
  style,
  ...props
}: SkeletonProps) => {
  const classNames = useGetClassNames(skeletonStyles, classNameOverrides, {
    component: { variant },
  });

  const inlineStyle: CSSProperties = {
    width: typeof width === "number" ? `${width}px` : width,
    height: typeof height === "number" ? `${height}px` : height,
    ...style,
  };

  return <div className={classNames.component} style={inlineStyle} {...props} />;
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

export const SkeletonCard = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={`space-y-3 ${className || ""}`} {...props}>
    <Skeleton width="100%" height={200} />
    <SkeletonText width="80%" />
    <SkeletonText width="60%" />
  </div>
);

SkeletonCard.displayName = "DS_SkeletonCard";
