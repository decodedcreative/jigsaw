"use client";

import {
  Tooltip as ReactAriaTooltip,
  OverlayArrow,
} from "react-aria-components";
import { twMerge } from "tailwind-merge";
import { useGetClassNames, useThemeProvider } from "@hooks";
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
  const theme = useThemeProvider();
  const twMergeFn = theme?.twMerge ?? twMerge;

  const classNames = useGetClassNames(
    tooltipStyles,
    classNameOverrides,
    {
      component: { placement },
      arrow: {},
    }
  );

  const rootClassName =
    typeof className === "function"
      ? className
      : twMergeFn(classNames.component, className);

  return (
    <ReactAriaTooltip
      offset={10}
      placement={placement}
      className={rootClassName}
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
