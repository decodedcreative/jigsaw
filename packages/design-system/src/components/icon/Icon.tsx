import { getPartProps, mergeClassName } from "@utils";
import { customIconStyles, iconStyles } from "./Icon.styles";
import { isCustomIconProps, type IconProps } from "./Icon.types";

export function Icon(props: IconProps) {
  if (isCustomIconProps(props)) {
    const {
      size = "md",
      tone,
      classNameOverrides,
      className,
      "aria-hidden": ariaHidden = true,
      viewBox,
      children,
      ...svgProps
    } = props;

    const parts = getPartProps("custom-icon", customIconStyles, classNameOverrides, {
      component: { size, tone },
    });

    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox={viewBox}
        fill="currentColor"
        aria-hidden={ariaHidden}
        {...svgProps}
        {...parts.component} className={mergeClassName(parts.component.className, className)}
      >
        {children}
      </svg>
    );
  }

  const {
    size = "md",
    tone,
    classNameOverrides,
    className,
    "aria-hidden": ariaHidden = true,
    icon: PhosphorIcon,
    weight = "bold",
    ...phosphorProps
  } = props;

  const parts = getPartProps("icon", iconStyles, classNameOverrides, {
    component: { size, tone },
  });

  return (
    <PhosphorIcon
      weight={weight}
      aria-hidden={ariaHidden}
      {...phosphorProps}
      {...parts.component} className={mergeClassName(parts.component.className, className)}
    />
  );
}

Icon.displayName = "DS_Icon";
