"use client";

import { Link as ReactAriaLink } from "react-aria-components";
import { useGetClassNames, useRootClassName, useAccessibleNameWarning } from "@hooks";
import { linkStyles } from "./Link.styles";
import type { LinkProps } from "./Link.types";

export function Link({
  variant = "default",
  size = "md",
  classNameOverrides,
  className,
  children,
  ref,
  ...props
}: LinkProps) {
  const nameRef = useAccessibleNameWarning("Link", ref);
  const classNames = useGetClassNames(linkStyles, classNameOverrides, {
    component: { variant, size },
  });
  const rootClassName = useRootClassName(classNames.component, className);

  return (
    <ReactAriaLink className={rootClassName} {...props} ref={nameRef}>
      {children}
    </ReactAriaLink>
  );
}

Link.displayName = "DS_Link";
