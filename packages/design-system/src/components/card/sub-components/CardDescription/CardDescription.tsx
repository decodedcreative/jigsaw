"use client";

import type { FC } from "react";
import { useGetClassNames } from "@hooks";
import { cardDescriptionStyles } from "./CardDescription.styles";
import type { CardDescriptionProps } from "./CardDescription.types";

export const CardDescription: FC<CardDescriptionProps> = ({
  classNameOverrides,
  children,
  ...props
}: CardDescriptionProps) => {
  const classNames = useGetClassNames(cardDescriptionStyles, classNameOverrides, {
    description: {},
  });
  return (
    <p className={classNames.description} {...props}>
      {children}
    </p>
  );
};

CardDescription.displayName = "DS_CardDescription";
