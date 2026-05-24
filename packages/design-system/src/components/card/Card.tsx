"use client";

import type { FC } from "react";
import { useGetClassNames } from "@hooks";
import { cardStyles } from "./Card.styles";
import type { CardProps } from "./Card.types";

export const Card: FC<CardProps> = ({
  variant = "default",
  classNameOverrides,
  children,
  ...props
}: CardProps) => {
  const classNames = useGetClassNames(cardStyles, classNameOverrides, {
    component: { variant },
  });

  return (
    <div className={classNames.component} {...props}>
      {children}
    </div>
  );
};

Card.displayName = "DS_Card";
