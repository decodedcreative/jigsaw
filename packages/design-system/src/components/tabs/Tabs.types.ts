import type { TabsProps as ReactAriaTabsProps } from "react-aria-components";
import type { ClassNameOverrides, WithoutClassName } from "@jsw-types/component-props";
import type { tabsStyles } from "./Tabs.styles";

export type TabsProps = WithoutClassName<ReactAriaTabsProps> & {
  classNameOverrides?: ClassNameOverrides<typeof tabsStyles>;
};
