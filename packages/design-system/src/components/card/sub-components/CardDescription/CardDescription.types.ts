import type { HTMLAttributes } from "react";
import type { WithoutClassName } from "../../../../types/component-props";

export type CardDescriptionProps = WithoutClassName<HTMLAttributes<HTMLParagraphElement>> & {
  classNameOverrides?: Record<string, string[]>;
};
