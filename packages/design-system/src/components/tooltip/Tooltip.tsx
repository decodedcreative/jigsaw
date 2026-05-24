"use client";

import type { FC } from "react";
import {
  Tooltip as ReactAriaTooltip,
  OverlayArrow as ReactAriaOverlayArrow,
} from "react-aria-components";
import { useGetClassNames } from "@hooks";
import { tooltipStyles, type TooltipPlacement } from "./Tooltip.styles";
import type { TooltipProps } from "./Tooltip.types";

export const Tooltip: FC<TooltipProps> = ({
  children,
  showArrow = true,
  classNameOverrides,
  placement = "top",
  ...props
}) => {
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
        <ReactAriaOverlayArrow>
          <svg width={12} height={12} viewBox="0 0 12 12" className={classNames.arrow}>
            <path d="M0 0 L6 6 L12 0" />
          </svg>
        </ReactAriaOverlayArrow>
      )}
      {children}
    </ReactAriaTooltip>
  );
};

Tooltip.displayName = "DS_Tooltip";
