"use client";

import {
  Tabs as ReactAriaTabsRoot,
  TabList as ReactAriaTabList,
  Tab as ReactAriaTab,
  TabPanel as ReactAriaTabPanel,
  type TabsProps as ReactAriaTabsProps,
  type TabListProps as ReactAriaTabListProps,
  type TabProps as ReactAriaTabProps,
  type TabPanelProps as ReactAriaTabPanelProps,
} from "react-aria-components";
import { useGetClassNames } from "@hooks";
import { tabsStyles, type TabsVariant } from "./Tabs.styles";

export type TabsProps = ReactAriaTabsProps & {
  classNameOverrides?: Record<string, string[]>;
};

export const Tabs = ({ classNameOverrides, children, ...props }: TabsProps) => {
  const classNames = useGetClassNames(tabsStyles, classNameOverrides, { root: {} });
  return (
    <ReactAriaTabsRoot className={classNames.root} {...props}>
      {children}
    </ReactAriaTabsRoot>
  );
};

Tabs.displayName = "DS_Tabs";

export type TabListProps<T extends object> = ReactAriaTabListProps<T> & {
  variant?: TabsVariant;
  classNameOverrides?: Record<string, string[]>;
};

export function TabList<T extends object>({
  variant = "default",
  classNameOverrides,
  children,
  ...props
}: TabListProps<T>) {
  const classNames = useGetClassNames(tabsStyles, classNameOverrides, {
    list: { variant },
  });
  return (
    <ReactAriaTabList className={classNames.list} {...props}>
      {children}
    </ReactAriaTabList>
  );
}

export type TabProps = ReactAriaTabProps & {
  variant?: TabsVariant;
  classNameOverrides?: Record<string, string[]>;
};

export const Tab = ({ variant = "default", classNameOverrides, children, ...props }: TabProps) => {
  const classNames = useGetClassNames(tabsStyles, classNameOverrides, {
    tab: { variant },
  });
  return (
    <ReactAriaTab className={classNames.tab} {...props}>
      {children}
    </ReactAriaTab>
  );
};

Tab.displayName = "DS_Tab";

export type TabPanelProps = ReactAriaTabPanelProps & {
  classNameOverrides?: Record<string, string[]>;
};

export const TabPanel = ({ classNameOverrides, children, ...props }: TabPanelProps) => {
  const classNames = useGetClassNames(tabsStyles, classNameOverrides, { panel: {} });
  return (
    <ReactAriaTabPanel className={classNames.panel} {...props}>
      {children}
    </ReactAriaTabPanel>
  );
};

TabPanel.displayName = "DS_TabPanel";
