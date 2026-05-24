"use client";

import { useContext, type FC } from "react";
import { OverlayTriggerStateContext, Link as ReactAriaLink } from "react-aria-components";
import { useGetClassNames } from "@hooks";
import { navigationLinkStyles } from "./NavigationLink.styles";
import type { NavigationLinkProps } from "./NavigationLink.types";

export const NavigationLink: FC<NavigationLinkProps> = ({
  href,
  isCurrent,
  classNameOverrides,
  children,
  onPress,
  ...props
}: NavigationLinkProps) => {
  const overlay = useContext(OverlayTriggerStateContext);
  const classNames = useGetClassNames(navigationLinkStyles, classNameOverrides, { navItem: {} });

  return (
    <ReactAriaLink
      href={href}
      className={classNames.navItem}
      data-current={isCurrent ? "" : undefined}
      aria-current={isCurrent ? "page" : undefined}
      onPress={(e) => {
        overlay?.close();
        onPress?.(e);
      }}
      {...props}
    >
      {children}
    </ReactAriaLink>
  );
};

NavigationLink.displayName = "DS_NavigationLink";
