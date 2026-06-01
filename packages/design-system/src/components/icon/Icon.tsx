"use client";

import { useGetClassNames } from "@hooks";
import { customIconStyles, iconStyles } from "./Icon.styles";
import { isCustomIconProps, type IconProps } from "./Icon.types";

export function Icon(props: IconProps) {
  const {
    size = "md",
    tone,
    classNameOverrides,
    "aria-hidden": ariaHidden = true,
    ...rest
  } = props;

  if (isCustomIconProps(props)) {
    const { viewBox, children, ...svgProps } = rest;

    const classNames = useGetClassNames(customIconStyles, classNameOverrides, {
      component: { size, tone },
    });

    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox={viewBox}
        fill="currentColor"
        className={classNames.component}
        aria-hidden={ariaHidden}
        {...svgProps}
      >
        {children}
      </svg>
    );
  }

  const { icon: PhosphorIcon, weight = "bold", ...phosphorProps } = rest;

  const classNames = useGetClassNames(iconStyles, classNameOverrides, {
    component: { size, tone },
  });

  return (
    <PhosphorIcon
      className={classNames.component}
      weight={weight}
      aria-hidden={ariaHidden}
      {...phosphorProps}
    />
  );
}

Icon.displayName = "DS_Icon";
