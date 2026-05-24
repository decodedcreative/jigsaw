import type { HTMLAttributes } from "react";
import type { WithoutClassName } from "../../../../types/component-props";

export type AvatarFallbackProps = WithoutClassName<HTMLAttributes<HTMLSpanElement>> & {
  classNameOverrides?: Record<string, string[]>;
};
