import type { TabsProps as ReactAriaTabsProps } from "react-aria-components";
import type { ClassNameOverrides, RefProp } from "@jsw-types/component-props";
import type { tabsStyles } from "./Tabs.styles";

export type TabsProps = RefProp<HTMLDivElement> & ReactAriaTabsProps & {
  classNameOverrides?: ClassNameOverrides<typeof tabsStyles>;
};
