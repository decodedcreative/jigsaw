"use client";

import type { FC } from "react";
import { Link as ReactAriaLink } from "react-aria-components";
import { useGetClassNames } from "@hooks";
import { linkButtonStyles } from "./LinkButton.styles";
import type { LinkButtonProps } from "./LinkButton.types";

export const LinkButton: FC<LinkButtonProps> = ({
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
