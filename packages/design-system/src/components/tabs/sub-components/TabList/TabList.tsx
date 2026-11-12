"use client";

import { TabList as ReactAriaTabList } from "react-aria-components";
import { useGetClassNames, useRootClassName } from "@hooks";
import { tabListStyles } from "./TabList.styles";
import type { TabListProps } from "./TabList.types";

export function TabList<T extends object>(props: TabListProps<T>) {
  const { variant = "default", classNameOverrides, className, children, ...rest } = props;
  const classNames = useGetClassNames(tabListStyles, classNameOverrides, {
    component: { variant },
  });
  const rootClassName = useRootClassName(classNames.component, className);
  return (
    <ReactAriaTabList {...rest} className={rootClassName}>
      {children}
    </ReactAriaTabList>
  );
}

TabList.displayName = "DS_TabList";
