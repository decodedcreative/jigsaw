import type { VariantProps } from "class-variance-authority";
import type { LinkProps as ReactAriaLinkProps } from "react-aria-components";
import type { ClassNameOverrides } from "@jsw-types/component-props";
import type { linkStyles } from "./Link.styles";

export type LinkVariant = NonNullable<VariantProps<typeof linkStyles.component>["variant"]>;
export type LinkSize = NonNullable<VariantProps<typeof linkStyles.component>["size"]>;

export type LinkProps = ReactAriaLinkProps & {
  classNameOverrides?: ClassNameOverrides<typeof linkStyles>;
  size?: LinkSize;
  variant?: LinkVariant;
};
