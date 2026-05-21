"use client";

import {
  Tabs as AriaTabsRoot,
  TabList as AriaTabList,
  Tab as AriaTab,
  TabPanel as AriaTabPanel,
  type TabsProps as AriaTabsProps,
  type TabListProps as AriaTabListProps,
  type TabProps as AriaTabProps,
  type TabPanelProps as AriaTabPanelProps,
} from "react-aria-components";
import { useGetClassNames } from "@hooks";
import { tabsStyles, type TabsVariant } from "./Tabs.styles";

export type TabsProps = AriaTabsProps & {
  classNameOverrides?: Record<string, string[]>;
};

export const Tabs = ({ classNameOverrides, children, ...props }: TabsProps) => {
  const classNames = useGetClassNames(tabsStyles, classNameOverrides, { root: {} });
  return (
    <AriaTabsRoot className={classNames.root} {...props}>
      {children}
    </AriaTabsRoot>
  );
};

Tabs.displayName = "DS_Tabs";

export type TabListProps<T extends object> = AriaTabListProps<T> & {
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
    <AriaTabList className={classNames.list} {...props}>
      {children}
    </AriaTabList>
  );
}

export type TabProps = AriaTabProps & {
  variant?: TabsVariant;
  classNameOverrides?: Record<string, string[]>;
};

export const Tab = ({ variant = "default", classNameOverrides, children, ...props }: TabProps) => {
  const classNames = useGetClassNames(tabsStyles, classNameOverrides, {
    tab: { variant },
  });
  return (
    <AriaTab className={classNames.tab} {...props}>
      {children}
    </AriaTab>
  );
};

Tab.displayName = "DS_Tab";

export type TabPanelProps = AriaTabPanelProps & {
  classNameOverrides?: Record<string, string[]>;
};

export const TabPanel = ({ classNameOverrides, children, ...props }: TabPanelProps) => {
  const classNames = useGetClassNames(tabsStyles, classNameOverrides, { panel: {} });
  return (
    <AriaTabPanel className={classNames.panel} {...props}>
      {children}
    </AriaTabPanel>
  );
};

TabPanel.displayName = "DS_TabPanel";
