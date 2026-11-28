"use client";

import { TabList as ReactAriaTabList } from "react-aria-components";
import { usePartProps, useRootClassName } from "@hooks";
import { tabListStyles } from "./TabList.styles";
import type { TabListProps } from "./TabList.types";

export function TabList<T extends object>(props: TabListProps<T>) {
  const { variant = "default", classNameOverrides, className, children, ...rest } = props;
  const parts = usePartProps("tab-list", tabListStyles, classNameOverrides, {
    component: { variant },
  });
  const rootClassName = useRootClassName(parts.component.className, className);
  return (
    <ReactAriaTabList {...rest} {...parts.component} className={rootClassName}>
      {children}
    </ReactAriaTabList>
  );
}

TabList.displayName = "DS_TabList";
