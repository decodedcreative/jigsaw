"use client";

import { Link as ReactAriaLink } from "react-aria-components";
import { usePartProps, useRootClassName, useAccessibleNameWarning } from "@hooks";
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
  const parts = usePartProps("link-button", linkButtonStyles, classNameOverrides, {
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

LinkButton.displayName = "DS_LinkButton";

export const ButtonLink = LinkButton;
ButtonLink.displayName = "DS_ButtonLink";
