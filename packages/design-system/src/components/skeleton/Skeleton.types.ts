import type { VariantProps } from "class-variance-authority";
import type { skeletonStyles } from "./Skeleton.styles";

export type SkeletonVariant = NonNullable<VariantProps<typeof skeletonStyles.component>["variant"]>;
