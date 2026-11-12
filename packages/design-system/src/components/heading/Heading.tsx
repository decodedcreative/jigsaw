import { getClassNames, mergeClassName } from "@utils";
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

  const classNames = getClassNames(headingStyles, classNameOverrides ?? {}, {
    component: { size: visualSize, muted },
  });

  return (
    <Component {...props} className={mergeClassName(classNames.component, className)}>
      {children}
    </Component>
  );
};

Heading.displayName = "DS_Heading";
