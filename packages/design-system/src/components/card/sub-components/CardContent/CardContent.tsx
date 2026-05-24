"use client";

import type { FC } from "react";
import { useGetClassNames } from "@hooks";
import { cardContentStyles } from "./CardContent.styles";
import type { CardContentProps } from "./CardContent.types";

export const CardContent: FC<CardContentProps> = ({
  padding = "md",
  classNameOverrides,
  children,
  ...props
}: CardContentProps) => {
  const classNames = useGetClassNames(cardContentStyles, classNameOverrides, {
    content: { padding },
  });
  return (
    <div className={classNames.content} {...props}>
      {children}
    </div>
  );
};

CardContent.displayName = "DS_CardContent";
