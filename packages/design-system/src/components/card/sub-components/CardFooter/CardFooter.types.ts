import type { HTMLAttributes } from "react";
import type { WithoutClassName } from "../../../../types/component-props";

export type CardFooterProps = WithoutClassName<HTMLAttributes<HTMLDivElement>> & {
  classNameOverrides?: Record<string, string[]>;
};
