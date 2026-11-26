"use client";

import { Link as ReactAriaLink } from "react-aria-components";
import { useGetClassNames, useRootClassName, useAccessibleNameWarning } from "@hooks";
import { linkButtonStyles } from "./LinkButton.styles";
import type { LinkButtonProps } from "./LinkButton.types";

export function LinkButton({
  variant = "primary",
  size = "md",
  classNameOverrides,
  className,
  children,
  ref,
  ...props
}: LinkButtonProps) {
  const nameRef = useAccessibleNameWarning("LinkButton", ref);
  const classNames = useGetClassNames(linkButtonStyles, classNameOverrides, {
    component: { variant, size },
  });
  const rootClassName = useRootClassName(classNames.component, className);

  return (
    <ReactAriaLink className={rootClassName} {...props} ref={nameRef}>
      {children}
    </ReactAriaLink>
  );
}

LinkButton.displayName = "DS_LinkButton";

export const ButtonLink = LinkButton;
ButtonLink.displayName = "DS_ButtonLink";
