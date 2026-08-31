import { getClassNames } from "@utils";
import { customIconStyles, iconStyles } from "./Icon.styles";
import { isCustomIconProps, type IconProps } from "./Icon.types";

export function Icon(props: IconProps) {
  if (isCustomIconProps(props)) {
    const {
      size = "md",
      tone,
      classNameOverrides,
      "aria-hidden": ariaHidden = true,
      viewBox,
      children,
      ...svgProps
    } = props;

    const classNames = getClassNames(customIconStyles, classNameOverrides, {
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

  const {
    size = "md",
    tone,
    classNameOverrides,
    "aria-hidden": ariaHidden = true,
    icon: PhosphorIcon,
    weight = "bold",
    ...phosphorProps
  } = props;

  const classNames = getClassNames(iconStyles, classNameOverrides, {
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
