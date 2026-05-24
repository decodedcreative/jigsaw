"use client";

import type { FC } from "react";
import { TabPanel as ReactAriaTabPanel } from "react-aria-components";
import { useGetClassNames } from "@hooks";
import { tabPanelStyles } from "./TabPanel.styles";
import type { TabPanelProps } from "./TabPanel.types";

export const TabPanel: FC<TabPanelProps> = ({ classNameOverrides, children, ...props }: TabPanelProps) => {
  const classNames = useGetClassNames(tabPanelStyles, classNameOverrides, { panel: {} });
  return (
    <ReactAriaTabPanel className={classNames.panel} {...props}>
      {children}
    </ReactAriaTabPanel>
  );
};

TabPanel.displayName = "DS_TabPanel";
