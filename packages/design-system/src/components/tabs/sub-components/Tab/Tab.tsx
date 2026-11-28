"use client";

import type { FC } from "react";
import { Tab as ReactAriaTab } from "react-aria-components";
import { usePartProps, useRootClassName, useAccessibleNameWarning } from "@hooks";
import { tabStyles } from "./Tab.styles";
import type { TabProps } from "./Tab.types";

export const Tab: FC<TabProps> = ({
  variant = "default",
  classNameOverrides,
  className,
  children,
  ref,
  ...props
}: TabProps) => {
  const nameRef = useAccessibleNameWarning("Tab", ref);
  const parts = usePartProps("tab", tabStyles, classNameOverrides, {
    component: { variant },
  });
  const rootClassName = useRootClassName(parts.component.className, className);
  return (
    <ReactAriaTab {...props} ref={nameRef} {...parts.component} className={rootClassName}>
      {children}
    </ReactAriaTab>
  );
};

Tab.displayName = "DS_Tab";
