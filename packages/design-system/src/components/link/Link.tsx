"use client";

import { Link as ReactAriaLink } from "react-aria-components";
import { usePartProps, useRootClassName, useAccessibleNameWarning } from "@hooks";
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
  const parts = usePartProps("link", linkStyles, classNameOverrides, {
    component: { variant, size },
  });
  const rootClassName = useRootClassName(parts.component.className, className);

  return (
    <ReactAriaLink
      {...props}
      {...parts.component}
      className={rootClassName}
      ref={nameRef}
    >
      {children}
    </ReactAriaLink>
  );
}

Link.displayName = "DS_Link";
