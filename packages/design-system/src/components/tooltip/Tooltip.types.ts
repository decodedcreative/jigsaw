import type { ReactNode } from "react";
import type { VariantProps } from "class-variance-authority";
import type {
  TooltipProps as ReactAriaTooltipProps,
  TooltipTriggerComponentProps,
} from "react-aria-components";
import type { ClassNameOverrides } from "@jsw-types/component-props";
import type { tooltipStyles } from "./Tooltip.styles";

export type TooltipPlacement = NonNullable<
  VariantProps<typeof tooltipStyles.component>["placement"]
>;

export type TooltipProps = Omit<ReactAriaTooltipProps, "children"> & {
  children: ReactNode;
  showArrow?: boolean;
  classNameOverrides?: ClassNameOverrides<typeof tooltipStyles>;
  placement?: TooltipPlacement;
};

export type TooltipTriggerProps = TooltipTriggerComponentProps & {
  children: ReactNode;
};
