"use client";

import { useGetClassNames } from "@hooks";
import { iconStyles } from "./Icon.styles";
import type { IconProps } from "./Icon.types";

export function Icon({
  icon: PhosphorIcon,
  size = "md",
  tone,
  weight = "bold",
  classNameOverrides,
  "aria-hidden": ariaHidden = true,
  ...props
}: IconProps) {
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
}

Icon.displayName = "DS_Icon";
