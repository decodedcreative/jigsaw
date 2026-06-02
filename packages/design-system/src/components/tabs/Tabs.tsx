"use client";

import type { FC } from "react";
import { Tabs as ReactAriaTabs } from "react-aria-components";
import { useGetClassNames } from "@hooks";
import { tabsStyles } from "./Tabs.styles";
import type { TabsProps } from "./Tabs.types";

export const Tabs: FC<TabsProps> = ({ classNameOverrides, children, ...props }: TabsProps) => {
  const classNames = useGetClassNames(tabsStyles, classNameOverrides, { component: {} });
  return (
    <ReactAriaTabs className={classNames.component} {...props}>
      {children}
    </ReactAriaTabs>
  );
};

Tabs.displayName = "DS_Tabs";
