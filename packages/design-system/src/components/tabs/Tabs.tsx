"use client";

import type { FC } from "react";
import { Tabs as ReactAriaTabs } from "react-aria-components";
import { usePartProps, useRootClassName } from "@hooks";
import { tabsStyles } from "./Tabs.styles";
import type { TabsProps } from "./Tabs.types";

export const Tabs: FC<TabsProps> = ({ classNameOverrides, className, children, ...props }: TabsProps) => {
  const parts = usePartProps("tabs", tabsStyles, classNameOverrides, { component: {} });
  const rootClassName = useRootClassName(parts.component.className, className);
  return (
    <ReactAriaTabs {...props} {...parts.component} className={rootClassName}>
      {children}
    </ReactAriaTabs>
  );
};

Tabs.displayName = "DS_Tabs";
