"use client";

import { type FC,  type CSSProperties } from "react";
import { useGetClassNames } from "@hooks";
import { skeletonStyles } from "./Skeleton.styles";
import type { SkeletonProps } from "./Skeleton.types";

export const Skeleton: FC<SkeletonProps> = ({
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
