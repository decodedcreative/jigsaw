import type { HTMLAttributes } from "react";
import type { WithoutClassName } from "../../../../types/component-props";
import type { CardContentPadding } from "./CardContent.styles";

export type CardContentProps = WithoutClassName<HTMLAttributes<HTMLDivElement>> & {
  padding?: CardContentPadding;
  classNameOverrides?: Record<string, string[]>;
};
