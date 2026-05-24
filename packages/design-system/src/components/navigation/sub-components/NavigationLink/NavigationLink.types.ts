import type { ReactNode } from "react";
import type { LinkProps as ReactAriaLinkProps } from "react-aria-components";

export type NavigationLinkProps = {
  href: string;
  isCurrent?: boolean;
  children: ReactNode;
  classNameOverrides?: Record<string, string[]>;
} & Pick<ReactAriaLinkProps, "onPress">;
