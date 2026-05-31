"use client";

import type { FC } from "react";
import { useGetClassNames } from "@hooks";
import { iconStyles } from "./Icon.styles";
import type { IconProps } from "./Icon.types";

export const Icon: FC<IconProps> = ({
  icon: PhosphorIcon,
  size = "md",
  tone,
  weight = "bold",
  classNameOverrides,
  "aria-hidden": ariaHidden = true,
  ...props
}) => {
  const classNames = useGetClassNames(iconStyles, classNameOverrides, {
    component: { size, tone },
  });

  return (
    <PhosphorIcon
      className={classNames.component}
      weight={weight}
      aria-hidden={ariaHidden}
      {...props}
    />
  );
};

Icon.displayName = "DS_Icon";
