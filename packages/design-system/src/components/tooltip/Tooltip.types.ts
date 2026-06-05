import type { ReactNode } from "react";
import type {
  TooltipProps as ReactAriaTooltipProps,
  TooltipTriggerComponentProps,
} from "react-aria-components";
import type { ClassNameOverrides, WithoutClassName } from "@jsw-types/component-props";
import type { tooltipStyles } from "./Tooltip.styles";

export type TooltipPlacement = "top" | "bottom" | "left" | "right";

export type TooltipProps = Omit<ReactAriaTooltipProps, "children"> & {
  children: ReactNode;
  showArrow?: boolean;
  classNameOverrides?: ClassNameOverrides<typeof tooltipStyles>;
  placement?: TooltipPlacement;
};

export type TooltipTriggerProps = WithoutClassName<TooltipTriggerComponentProps> & {
  children: ReactNode;
};
