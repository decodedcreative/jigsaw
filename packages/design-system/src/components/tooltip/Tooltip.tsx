"use client";

import { type ReactNode } from "react";
import {
  Tooltip as ReactAriaTooltip,
  TooltipTrigger as ReactAriaTooltipTrigger,
  OverlayArrow,
  type TooltipProps as ReactAriaTooltipProps,
  type TooltipTriggerComponentProps,
} from "react-aria-components";
import { useGetClassNames } from "@hooks";
import { tooltipStyles, type TooltipPlacement } from "./Tooltip.styles";

export type TooltipTriggerProps = TooltipTriggerComponentProps & {
  children: ReactNode;
};

export function TooltipTrigger({ children, ...props }: TooltipTriggerProps) {
  return <ReactAriaTooltipTrigger {...props}>{children}</ReactAriaTooltipTrigger>;
}

TooltipTrigger.displayName = "DS_TooltipTrigger";

export type TooltipProps = Omit<ReactAriaTooltipProps, "children"> & {
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
    <ReactAriaTooltip
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
    </ReactAriaTooltip>
  );
}

Tooltip.displayName = "DS_Tooltip";
