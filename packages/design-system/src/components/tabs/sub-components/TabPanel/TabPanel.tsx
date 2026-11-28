"use client";

import type { FC } from "react";
import { TabPanel as ReactAriaTabPanel } from "react-aria-components";
import { usePartProps, useRootClassName } from "@hooks";
import { tabPanelStyles } from "./TabPanel.styles";
import type { TabPanelProps } from "./TabPanel.types";

export const TabPanel: FC<TabPanelProps> = ({ classNameOverrides, className, children, ...props }: TabPanelProps) => {
  const parts = usePartProps("tab-panel", tabPanelStyles, classNameOverrides, { component: {} });
  const rootClassName = useRootClassName(parts.component.className, className);
  return (
    <ReactAriaTabPanel {...props} {...parts.component} className={rootClassName}>
      {children}
    </ReactAriaTabPanel>
  );
};

TabPanel.displayName = "DS_TabPanel";
