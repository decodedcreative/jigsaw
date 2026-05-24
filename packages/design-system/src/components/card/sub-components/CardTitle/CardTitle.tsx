"use client";

import type { FC } from "react";
import { useGetClassNames } from "@hooks";
import { cardTitleStyles } from "./CardTitle.styles";
import type { CardTitleProps } from "./CardTitle.types";

export const CardTitle: FC<CardTitleProps> = ({ classNameOverrides, children, ...props }: CardTitleProps) => {
  const classNames = useGetClassNames(cardTitleStyles, classNameOverrides, { title: {} });
  return (
    <h3 className={classNames.title} {...props}>
      {children}
    </h3>
  );
};

CardTitle.displayName = "DS_CardTitle";
