"use client";

import type { FC } from "react";
import { Skeleton } from "../../Skeleton";
import { SkeletonText } from "../SkeletonText";
import type { SkeletonCardProps } from "./SkeletonCard.types";

export const SkeletonCard: FC<SkeletonCardProps> = ({ classNameOverrides, ...props }: SkeletonCardProps) => {
  const extra = classNameOverrides?.component?.join(" ") ?? "";
  return (
  <div className={`space-y-3 ${extra}`.trim()} {...props}>
    <Skeleton width="100%" height={200} />
    <SkeletonText width="80%" />
    <SkeletonText width="60%" />
  </div>
  );
};

SkeletonCard.displayName = "DS_SkeletonCard";
