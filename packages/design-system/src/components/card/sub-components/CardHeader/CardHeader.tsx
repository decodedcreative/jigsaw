"use client";

import type { FC } from "react";
import { useGetClassNames } from "@hooks";
import { cardHeaderStyles } from "./CardHeader.styles";
import type { CardHeaderProps } from "./CardHeader.types";

export const CardHeader: FC<CardHeaderProps> = ({ classNameOverrides, children, ...props }: CardHeaderProps) => {
  const classNames = useGetClassNames(cardHeaderStyles, classNameOverrides, { header: {} });
  return (
    <div className={classNames.header} {...props}>
      {children}
    </div>
  );
};

CardHeader.displayName = "DS_CardHeader";
