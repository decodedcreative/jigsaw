"use client";

import {
  Tooltip as ReactAriaTooltip,
  OverlayArrow,
} from "react-aria-components";
import { usePartProps, useRootClassName } from "@hooks";
import { tooltipStyles } from "./Tooltip.styles";
import type { TooltipProps } from "./Tooltip.types";

export function Tooltip({
  children,
  showArrow = true,
  classNameOverrides,
  className,
  placement = "top",
  ...props
}: TooltipProps) {
  const parts = usePartProps("tooltip", tooltipStyles, classNameOverrides, {
    component: { placement },
  });
  const rootClassName = useRootClassName(parts.component.className, className);

  return (
    <ReactAriaTooltip
      offset={10}
      placement={placement}
      {...props}
      {...parts.component}
      className={rootClassName}
    >
      {showArrow && (
        <OverlayArrow>
          <svg width={12} height={12} viewBox="0 0 12 12" {...parts.arrow}>
            <path d="M0 0 L6 6 L12 0" />
          </svg>
        </OverlayArrow>
      )}
      {children}
    </ReactAriaTooltip>
  );
}

Tooltip.displayName = "DS_Tooltip";
