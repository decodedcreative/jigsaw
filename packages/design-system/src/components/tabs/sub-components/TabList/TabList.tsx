"use client";

import { TabList as ReactAriaTabList } from "react-aria-components";
import { useGetClassNames } from "@hooks";
import { tabListStyles } from "./TabList.styles";
import type { TabListProps } from "./TabList.types";

export function TabList<T extends object>(props: TabListProps<T>) {
  const { variant = "default", classNameOverrides, children, ...rest } = props;
  const classNames = useGetClassNames(tabListStyles, classNameOverrides, {
    list: { variant },
  });
  return (
    <ReactAriaTabList className={classNames.list} {...rest}>
      {children}
    </ReactAriaTabList>
  );
}

TabList.displayName = "DS_TabList";
