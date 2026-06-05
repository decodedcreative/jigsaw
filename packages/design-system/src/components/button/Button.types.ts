import type { ReactNode } from "react";
import type { VariantProps } from "class-variance-authority";
import type { ButtonProps as ReactAriaButtonProps } from "react-aria-components";
import type { ClassNameOverrides } from "@jsw-types/component-props";
import type { buttonStyles } from "./Button.styles";

export type ButtonVariant = NonNullable<VariantProps<typeof buttonStyles.component>["variant"]>;
export type ButtonSize = NonNullable<VariantProps<typeof buttonStyles.component>["size"]>;
export type ButtonMediaPosition = NonNullable<
  VariantProps<typeof buttonStyles.component>["mediaPosition"]
>;

export type ButtonProps = Omit<ReactAriaButtonProps, "className" | "children"> & {
  children?: ReactNode;
  classNameOverrides?: ClassNameOverrides<typeof buttonStyles>;
  /** When true, the button spans the full width of its container. */
  fullWidth?: boolean;
  /** Icon or other media rendered in the media slot. */
  media?: ReactNode;
  /** Icon-only layout (compact, circular). Pair with `aria-label` or `title` for accessibility. */
  mediaOnly?: boolean;
  /** Places media after the label when `"right"`. Defaults to `"left"`. */
  mediaPosition?: ButtonMediaPosition;
  size?: ButtonSize;
  variant?: ButtonVariant;
};
