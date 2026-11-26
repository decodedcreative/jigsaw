"use client";

import { Button as ReactAriaButton } from "react-aria-components";
import { useGetClassNames, useRootClassName, useAccessibleNameWarning } from "@hooks";
import { buttonStyles } from "./Button.styles";
import type { ButtonProps } from "./Button.types";

export type { ButtonProps } from "./Button.types";

export function Button({
  variant = "primary",
  size = "md",
  fullWidth = false,
  mediaOnly = false,
  mediaPosition,
  media,
  classNameOverrides,
  className,
  children,
  ref,
  ...props
}: ButtonProps) {
  const nameRef = useAccessibleNameWarning("Button", ref);
  const position = mediaPosition ?? "left";
  const layoutPosition = media != null && !mediaOnly ? position : undefined;

  const classNames = useGetClassNames(buttonStyles, classNameOverrides, {
    component: {
      variant,
      size,
      mediaOnly,
      fullWidth,
      mediaPosition: layoutPosition,
    },
    text: { fullWidth: fullWidth && children != null },
  });
  const rootClassName = useRootClassName(classNames.component, className);

  const mediaSpan =
    media != null ? <span className={classNames.media}>{media}</span> : null;
  const textSpan =
    children != null ? <span className={classNames.text}>{children}</span> : null;

  return (
    <ReactAriaButton {...props} className={rootClassName} ref={nameRef}>
      {position === "left" && mediaSpan}
      {textSpan}
      {position === "right" && mediaSpan}
    </ReactAriaButton>
  );
}

Button.displayName = "DS_Button";
