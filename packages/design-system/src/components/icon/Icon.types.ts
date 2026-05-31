import type { Icon as PhosphorIcon, IconProps as PhosphorIconProps } from "@phosphor-icons/react";
import { iconStyles, type IconSize, type IconTone } from "./Icon.styles";
import type { ClassNameOverrides, WithoutClassName } from "../../types/component-props";

export type IconProps = WithoutClassName<Omit<PhosphorIconProps, "size">> & {
  icon: PhosphorIcon;
  size?: IconSize;
  /** Semantic foreground tone. Omit to inherit `currentColor` from the parent. */
  tone?: IconTone;
  classNameOverrides?: ClassNameOverrides<typeof iconStyles>;
};
