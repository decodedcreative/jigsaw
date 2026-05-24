"use client";

import type { FC } from "react";
import { useGetClassNames } from "@hooks";
import { headingStyles } from "./Heading.styles";
import type { HeadingProps } from "./Heading.types";

export const Heading: FC<HeadingProps> = ({
  as: Component = "h2",
  size,
  muted = false,
  classNameOverrides,
  children,
  ...props
}: HeadingProps) => {
  const visualSize = size ?? Component;

  const classNames = useGetClassNames(headingStyles, classNameOverrides, {
    component: { size: visualSize, muted },
  });

  return (
    <Component className={classNames.component} {...props}>
      {children}
    </Component>
  );
};

Heading.displayName = "DS_Heading";

export type { HeadingLevel, HeadingProps, HeadingSize } from "./Heading.types";
