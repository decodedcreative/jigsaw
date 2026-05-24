import type { Icon as PhosphorIcon, IconProps as PhosphorIconProps } from "@phosphor-icons/react";
import type { IconSize } from "./Icon.styles";
import type { WithoutClassName } from "../../types/component-props";

export type IconTone =
  | "primary"
  | "secondary"
  | "accent"
  | "success"
  | "warning"
  | "error";

export type IconProps = WithoutClassName<Omit<PhosphorIconProps, "size">> & {
  icon: PhosphorIcon;
  size?: IconSize;
  tone?: IconTone;
  classNameOverrides?: Record<string, string[]>;
};
