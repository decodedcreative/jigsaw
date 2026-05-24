import type { LinkProps as ReactAriaLinkProps } from "react-aria-components";
import type { WithoutClassName } from "../../../../types/component-props";

export type LinkButtonProps = WithoutClassName<ReactAriaLinkProps> & {
  classNameOverrides?: Record<string, string[]>;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary" | "accent" | "outline" | "ghost";
};
