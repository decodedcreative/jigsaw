import type { CSSProperties } from "react";
import type { CustomIconStyle } from "./Icon.types";

type IconFillSlot = "primary" | "secondary" | "tertiary" | "quaternary";

const VAR_NAME: Record<IconFillSlot, keyof CustomIconStyle> = {
  primary: "--icon-fill-primary",
  secondary: "--icon-fill-secondary",
  tertiary: "--icon-fill-tertiary",
  quaternary: "--icon-fill-quaternary",
};

/**
 * Optional shorthand when you prefer semantic slot names over raw CSS variables.
 *
 * @example
 * <Icon viewBox="0 0 24 24" style={iconFillStyle({ primary: "#4285F4", secondary: "#34A853" })}>
 */
export function iconFillStyle(fills: Partial<Record<IconFillSlot, string>>): CustomIconStyle {
  const style: Record<string, string> = {};

  for (const slot of Object.keys(fills) as IconFillSlot[]) {
    const value = fills[slot];
    if (value) style[VAR_NAME[slot]] = value;
  }

  return style as CSSProperties as CustomIconStyle;
}
