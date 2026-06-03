import type { VariantProps } from "class-variance-authority";
import type { tooltipStyles } from "./Tooltip.styles";

export type TooltipPlacement = NonNullable<VariantProps<typeof tooltipStyles.content>["placement"]>;
