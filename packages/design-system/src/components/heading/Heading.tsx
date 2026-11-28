import { getPartProps, mergeClassName } from "@utils";
import { headingStyles } from "./Heading.styles";
import type { HeadingProps } from "./Heading.types";

export const Heading = ({
  as: Component = "h2",
  size,
  muted = false,
  classNameOverrides = undefined,
  className,
  children,
  ...props
}: HeadingProps) => {
  const visualSize = size ?? Component;

  const parts = getPartProps("heading", headingStyles, classNameOverrides ?? {}, {
    component: { size: visualSize, muted },
  });

  return (
    <Component {...props} {...parts.component} className={mergeClassName(parts.component.className, className)}>
      {children}
    </Component>
  );
};

Heading.displayName = "DS_Heading";
