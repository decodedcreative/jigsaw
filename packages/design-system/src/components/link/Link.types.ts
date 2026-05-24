import type { LinkProps as ReactAriaLinkProps } from "react-aria-components";
import type { WithoutClassName } from "../../types/component-props";

export type LinkProps = WithoutClassName<ReactAriaLinkProps> & {
  classNameOverrides?: Record<string, string[]>;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "accent" | "subtle" | "muted" | "brand" | "media";
};
