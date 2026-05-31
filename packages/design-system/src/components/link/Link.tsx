"use client";

import * as React from "react";
import {
  Link as ReactAriaLink,
  type LinkProps as ReactAriaLinkProps,
} from "react-aria-components";
import { useGetClassNames } from "@hooks";
import { linkStyles, linkButtonStyles } from "./Link.styles";
import type { ClassNameOverrides, WithoutClassName } from "@jsw-types/component-props";

export type LinkProps = ReactAriaLinkProps & {
  classNameOverrides?: ClassNameOverrides<typeof linkStyles>;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "accent" | "subtle" | "muted";
};

export const Link = ({
  variant = "default",
  size = "md",
  classNameOverrides,
  children,
  ...props
}: LinkProps) => {
  const classNames = useGetClassNames(linkStyles, classNameOverrides, {
    component: { variant, size },
  });

  return (
    <ReactAriaLink className={classNames.component} {...props}>
      {children}
    </ReactAriaLink>
  );
};

Link.displayName = "DS_Link";

export type LinkButtonProps = ReactAriaLinkProps & {
  classNameOverrides?: ClassNameOverrides<typeof linkStyles>;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary" | "accent" | "outline" | "ghost";
};

export const LinkButton = ({
  variant = "primary",
  size = "md",
  classNameOverrides,
  children,
  ...props
}: LinkButtonProps) => {
  const classNames = useGetClassNames(linkButtonStyles, classNameOverrides, {
    component: { variant, size },
  });

  return (
    <ReactAriaLink className={classNames.component} {...props}>
      {children}
    </ReactAriaLink>
  );
};

LinkButton.displayName = "DS_LinkButton";

export const ButtonLink = LinkButton;
ButtonLink.displayName = "DS_ButtonLink";
