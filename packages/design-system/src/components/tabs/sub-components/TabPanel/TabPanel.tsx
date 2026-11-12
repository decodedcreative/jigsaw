"use client";

import type { FC } from "react";
import { TabPanel as ReactAriaTabPanel } from "react-aria-components";
import { useGetClassNames, useRootClassName } from "@hooks";
import { tabPanelStyles } from "./TabPanel.styles";
import type { TabPanelProps } from "./TabPanel.types";

export const TabPanel: FC<TabPanelProps> = ({ classNameOverrides, className, children, ...props }: TabPanelProps) => {
  const classNames = useGetClassNames(tabPanelStyles, classNameOverrides, { component: {} });
  const rootClassName = useRootClassName(classNames.component, className);
  return (
    <ReactAriaTabPanel {...props} className={rootClassName}>
      {children}
    </ReactAriaTabPanel>
  );
};

TabPanel.displayName = "DS_TabPanel";
