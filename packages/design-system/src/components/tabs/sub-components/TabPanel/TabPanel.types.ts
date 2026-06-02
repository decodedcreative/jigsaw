import type { TabPanelProps as ReactAriaTabPanelProps } from "react-aria-components";
import type { ClassNameOverrides, WithoutClassName } from "@jsw-types/component-props";
import type { tabPanelStyles } from "./TabPanel.styles";

export type TabPanelProps = WithoutClassName<ReactAriaTabPanelProps> & {
  classNameOverrides?: ClassNameOverrides<typeof tabPanelStyles>;
};
