"use client";

import type { FC } from "react";
import { TooltipTrigger as ReactAriaTooltipTrigger } from "react-aria-components";
import type { TooltipTriggerProps } from "./TooltipTrigger.types";

export const TooltipTrigger: FC<TooltipTriggerProps> = ({ children, ...props }) => {
  return <ReactAriaTooltipTrigger {...props}>{children}</ReactAriaTooltipTrigger>;
};

TooltipTrigger.displayName = "DS_TooltipTrigger";
