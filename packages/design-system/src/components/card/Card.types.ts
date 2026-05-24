import type { HTMLAttributes } from "react";
import type { CardVariant } from "./Card.styles";
import type { WithoutClassName } from "../../types/component-props";

export type CardProps = WithoutClassName<HTMLAttributes<HTMLDivElement>> & {
  variant?: CardVariant;
  classNameOverrides?: Record<string, string[]>;
};
