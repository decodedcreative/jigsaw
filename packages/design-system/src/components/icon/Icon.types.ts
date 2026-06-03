import type { VariantProps } from "class-variance-authority";
import type { CSSProperties, SVGAttributes } from "react";
import type { Icon as PhosphorIcon, IconProps as PhosphorIconProps } from "@phosphor-icons/react";
import { customIconStyles, iconStyles } from "./Icon.styles";
import type { ClassNameOverrides, WithoutClassName } from "@jsw-types/component-props";

type IconVariants = VariantProps<typeof iconStyles.component>;
export type IconSize = NonNullable<IconVariants["size"]>;
export type IconTone = NonNullable<IconVariants["tone"]>;

/** Allowed `--icon-fill-*` variables for custom SVG icons (use on `style`). */
type IconFillVars = {
  "--icon-fill-primary"?: string;
  "--icon-fill-secondary"?: string;
  "--icon-fill-tertiary"?: string;
  "--icon-fill-quaternary"?: string;
};

export type CustomIconStyle = CSSProperties & IconFillVars;

type IconSharedProps = {
  size?: IconSize;
  /** Semantic foreground tone on the <svg> (currentColor for paths without data-fill). */
  tone?: IconTone;
  "aria-hidden"?: boolean;
};

/** Phosphor glyph — single colour via tone or inherited currentColor. */
export type PhosphorIconComponentProps = IconSharedProps &
  WithoutClassName<Omit<PhosphorIconProps, "size" | "color">> & {
    icon: PhosphorIcon;
    classNameOverrides?: ClassNameOverrides<typeof iconStyles>;
    children?: never;
    viewBox?: never;
  };

/**
 * Custom SVG paths as children. Per-path colour via CSS custom properties on `style`.
 *
 * @example
 * <Icon
 *   viewBox="0 0 24 24"
 *   style={{
 *     "--icon-fill-primary": "#4285F4",
 *     "--icon-fill-secondary": "#34A853",
 *   }}
 * >
 *   <path data-fill="primary" d="..." />
 *   <path data-fill="secondary" d="..." />
 * </Icon>
 */
export type CustomIconComponentProps = IconSharedProps &
  Omit<SVGAttributes<SVGSVGElement>, "children" | "color" | "width" | "height" | "style"> & {
    icon?: never;
    weight?: never;
    viewBox: string;
    children: React.ReactNode;
    style?: CustomIconStyle;
    classNameOverrides?: ClassNameOverrides<typeof customIconStyles>;
  };

/**
 * Props for the design-system Icon wrapper.
 *
 * Phosphor's `color` prop is intentionally omitted — it sets an inline SVG fill and
 * bypasses semantic tokens / dark mode. Use `tone` for token-aligned colour, omit `tone`
 * to inherit `currentColor` from the parent, or `style` + `data-fill` for custom SVG.
 */
export type IconProps = PhosphorIconComponentProps | CustomIconComponentProps;

export function isCustomIconProps(props: IconProps): props is CustomIconComponentProps {
  return "viewBox" in props && typeof props.viewBox === "string";
}
