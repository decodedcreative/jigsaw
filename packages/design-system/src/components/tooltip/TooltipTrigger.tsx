"use client";

import { TooltipTrigger as ReactAriaTooltipTrigger } from "react-aria-components";
import type { TooltipTriggerProps } from "./Tooltip.types";

export function TooltipTrigger({ children, ...props }: TooltipTriggerProps) {
  return <ReactAriaTooltipTrigger {...props}>{children}</ReactAriaTooltipTrigger>;
}

TooltipTrigger.displayName = "DS_TooltipTrigger";
