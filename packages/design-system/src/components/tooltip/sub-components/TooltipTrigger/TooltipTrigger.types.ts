import type { ReactNode } from "react";
import type { TooltipTriggerComponentProps } from "react-aria-components";
import type { WithoutClassName } from "../../../../types/component-props";

export type TooltipTriggerProps = WithoutClassName<TooltipTriggerComponentProps> & {
  children: ReactNode;
};
