import type { Icon as PhosphorIcon, IconProps as PhosphorIconProps } from "@phosphor-icons/react";
import { iconStyles, type IconSize, type IconTone } from "./Icon.styles";
import type { ClassNameOverrides, WithoutClassName } from "@ds-types/component-props";

/**
 * Props for the design-system Icon wrapper.
 *
 * Phosphor's `color` prop is intentionally omitted — it sets an inline SVG fill and
 * bypasses semantic tokens / dark mode. Use `tone` for token-aligned colour, omit `tone`
 * to inherit `currentColor` from the parent, or `classNameOverrides` for one-off exceptions.
 */
export type IconProps = WithoutClassName<Omit<PhosphorIconProps, "size" | "color">> & {
  icon: PhosphorIcon;
  size?: IconSize;
  /** Semantic foreground tone. Omit to inherit `currentColor` from the parent. */
  tone?: IconTone;
  classNameOverrides?: ClassNameOverrides<typeof iconStyles>;
};
