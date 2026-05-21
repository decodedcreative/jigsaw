"use client";

import { type ReactNode } from "react";
import {
  Tooltip as AriaTooltip,
  TooltipTrigger as AriaTooltipTrigger,
  OverlayArrow,
  type TooltipProps as AriaTooltipProps,
  type TooltipTriggerComponentProps,
} from "react-aria-components";
import { useGetClassNames } from "@hooks";
import { tooltipStyles, type TooltipPlacement } from "./Tooltip.styles";

export type TooltipTriggerProps = TooltipTriggerComponentProps & {
  children: ReactNode;
};

export function TooltipTrigger({ children, ...props }: TooltipTriggerProps) {
  return <AriaTooltipTrigger {...props}>{children}</AriaTooltipTrigger>;
}

TooltipTrigger.displayName = "DS_TooltipTrigger";

export type TooltipProps = Omit<AriaTooltipProps, "children"> & {
  children: ReactNode;
  showArrow?: boolean;
  classNameOverrides?: Record<string, string[]>;
};

export function Tooltip({
  children,
  showArrow = true,
  classNameOverrides,
  placement = "top",
  ...props
}: TooltipProps) {
  const classNames = useGetClassNames(tooltipStyles, classNameOverrides, {
    content: { placement: placement as TooltipPlacement },
    arrow: {},
  });

  return (
    <AriaTooltip
      offset={10}
      placement={placement}
      className={classNames.content}
      {...props}
    >
      {showArrow && (
        <OverlayArrow>
          <svg width={12} height={12} viewBox="0 0 12 12" className={classNames.arrow}>
            <path d="M0 0 L6 6 L12 0" />
          </svg>
        </OverlayArrow>
      )}
      {children}
    </AriaTooltip>
  );
}

Tooltip.displayName = "DS_Tooltip";
