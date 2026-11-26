import type { VariantProps } from "class-variance-authority";
import type { LinkProps as ReactAriaLinkProps } from "react-aria-components";
import type { ClassNameOverrides, RefProp } from "@jsw-types/component-props";
import type { linkButtonStyles } from "./LinkButton.styles";

export type LinkButtonVariant = NonNullable<
  VariantProps<typeof linkButtonStyles.component>["variant"]
>;
export type LinkButtonSize = NonNullable<VariantProps<typeof linkButtonStyles.component>["size"]>;

export type LinkButtonProps = RefProp<HTMLAnchorElement> & ReactAriaLinkProps & {
  classNameOverrides?: ClassNameOverrides<typeof linkButtonStyles>;
  size?: LinkButtonSize;
  variant?: LinkButtonVariant;
};
