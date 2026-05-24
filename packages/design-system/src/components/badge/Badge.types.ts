import type { HTMLAttributes } from "react";
import type { BadgeSize, BadgeVariant } from "./Badge.styles";
import type { WithoutClassName } from "../../types/component-props";

export type BadgeProps = WithoutClassName<HTMLAttributes<HTMLSpanElement>> & {
  variant?: BadgeVariant;
  size?: BadgeSize;
  classNameOverrides?: Record<string, string[]>;
};
