import type { ReactNode } from "react";
import type { ButtonProps as ReactAriaButtonProps } from "react-aria-components";
import type { WithoutClassName } from "../../types/component-props";

export type ButtonMediaPosition = "left" | "right";

export type ButtonProps = Omit<WithoutClassName<ReactAriaButtonProps>, "children"> & {
  /** Button label rendered in the text slot. */
  children?: ReactNode;
  /** When true, the button spans the full width of its container. */
  fullWidth?: boolean;
  classNameOverrides?: Record<string, string[]>;
  /** Icon or other media rendered in the media slot. */
  media?: ReactNode;
  /** Icon-only layout (compact, circular). Pair with `aria-label` or `title` for accessibility. */
  mediaOnly?: boolean;
  /** Places media after the label when `"right"`. Defaults to `"left"`. */
  mediaPosition?: ButtonMediaPosition;
  size?: "sm" | "md" | "lg";
  variant?:
    | "primary"
    | "secondary"
    | "accent"
    | "outline"
    | "ghost"
    | "destructive"
    | "link";
};
