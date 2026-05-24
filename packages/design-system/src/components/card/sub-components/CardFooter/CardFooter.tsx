"use client";

import type { FC } from "react";
import { useGetClassNames } from "@hooks";
import { cardFooterStyles } from "./CardFooter.styles";
import type { CardFooterProps } from "./CardFooter.types";

export const CardFooter: FC<CardFooterProps> = ({ classNameOverrides, children, ...props }: CardFooterProps) => {
  const classNames = useGetClassNames(cardFooterStyles, classNameOverrides, { footer: {} });
  return (
    <div className={classNames.footer} {...props}>
      {children}
    </div>
  );
};

CardFooter.displayName = "DS_CardFooter";
