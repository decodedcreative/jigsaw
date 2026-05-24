import type { HTMLAttributes } from "react";
import type { WithoutClassName } from "../../../../types/component-props";

export type CardTitleProps = WithoutClassName<HTMLAttributes<HTMLHeadingElement>> & {
  classNameOverrides?: Record<string, string[]>;
};
