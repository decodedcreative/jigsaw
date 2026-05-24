"use client";

import type { FC } from "react";
import { Link as ReactAriaLink } from "react-aria-components";
import { useGetClassNames } from "@hooks";
import { linkStyles } from "./Link.styles";
import type { LinkProps } from "./Link.types";

export const Link: FC<LinkProps> = ({
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
