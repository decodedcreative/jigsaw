import type { ReactNode } from "react";
import type { TooltipProps as ReactAriaTooltipProps } from "react-aria-components";
import type { TooltipPlacement } from "./Tooltip.styles";
import type { WithoutClassName } from "../../types/component-props";

export type TooltipProps = WithoutClassName<Omit<ReactAriaTooltipProps, "children">> & {
  children: ReactNode;
  showArrow?: boolean;
  classNameOverrides?: Record<string, string[]>;
  placement?: TooltipPlacement;
};
