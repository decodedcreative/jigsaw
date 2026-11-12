"use client";

import type { FC } from "react";
import { Tab as ReactAriaTab } from "react-aria-components";
import { useGetClassNames, useRootClassName } from "@hooks";
import { tabStyles } from "./Tab.styles";
import type { TabProps } from "./Tab.types";

export const Tab: FC<TabProps> = ({ variant = "default", classNameOverrides, className, children, ...props }: TabProps) => {
  const classNames = useGetClassNames(tabStyles, classNameOverrides, {
    component: { variant },
  });
  const rootClassName = useRootClassName(classNames.component, className);
  return (
    <ReactAriaTab {...props} className={rootClassName}>
      {children}
    </ReactAriaTab>
  );
};

Tab.displayName = "DS_Tab";
