"use client";

import type { FC } from "react";
import { Skeleton } from "../../Skeleton";
import type { SkeletonCircleProps } from "./SkeletonCircle.types";

export const SkeletonCircle: FC<SkeletonCircleProps> = ({
  width = 40,
  height = 40,
  ...props
}: SkeletonCircleProps) => (
  <Skeleton variant="circular" width={width} height={height} {...props} />
);

SkeletonCircle.displayName = "DS_SkeletonCircle";
