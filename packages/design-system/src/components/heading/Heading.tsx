import { getClassNames } from "@utils";
import { headingStyles } from "./Heading.styles";
import type { HeadingProps } from "./Heading.types";

export const Heading = ({
  as: Component = "h2",
  size,
  muted = false,
  classNameOverrides = undefined,
  children,
  ...props
}: HeadingProps) => {
  const visualSize = size ?? Component;

  const classNames = getClassNames(headingStyles, classNameOverrides ?? {}, {
    component: { size: visualSize, muted },
  });

  return (
    <Component className={classNames.component} {...props}>
      {children}
    </Component>
  );
};

Heading.displayName = "DS_Heading";
