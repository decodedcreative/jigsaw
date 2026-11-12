"use client";

import type { FC } from "react";
import { Tabs as ReactAriaTabs } from "react-aria-components";
import { useGetClassNames, useRootClassName } from "@hooks";
import { tabsStyles } from "./Tabs.styles";
import type { TabsProps } from "./Tabs.types";

export const Tabs: FC<TabsProps> = ({ classNameOverrides, className, children, ...props }: TabsProps) => {
  const classNames = useGetClassNames(tabsStyles, classNameOverrides, { component: {} });
  const rootClassName = useRootClassName(classNames.component, className);
  return (
    <ReactAriaTabs {...props} className={rootClassName}>
      {children}
    </ReactAriaTabs>
  );
};

Tabs.displayName = "DS_Tabs";
