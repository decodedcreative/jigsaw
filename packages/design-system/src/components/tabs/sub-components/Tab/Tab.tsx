"use client";

import type { FC } from "react";
import { Tab as ReactAriaTab } from "react-aria-components";
import { useGetClassNames } from "@hooks";
import { tabStyles } from "./Tab.styles";
import type { TabProps } from "./Tab.types";

export const Tab: FC<TabProps> = ({ variant = "default", classNameOverrides, children, ...props }: TabProps) => {
  const classNames = useGetClassNames(tabStyles, classNameOverrides, {
    tab: { variant },
  });
  return (
    <ReactAriaTab className={classNames.tab} {...props}>
      {children}
    </ReactAriaTab>
  );
};

Tab.displayName = "DS_Tab";
