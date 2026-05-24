"use client";

import type { FC } from "react";
import { Skeleton } from "../../Skeleton";
import type { SkeletonTextProps } from "./SkeletonText.types";

export const SkeletonText: FC<SkeletonTextProps> = (props: SkeletonTextProps) => (
  <Skeleton variant="text" height={16} {...props} />
);

SkeletonText.displayName = "DS_SkeletonText";
