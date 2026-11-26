import type { TabPanelProps as ReactAriaTabPanelProps } from "react-aria-components";
import type { ClassNameOverrides, RefProp } from "@jsw-types/component-props";
import type { tabPanelStyles } from "./TabPanel.styles";

export type TabPanelProps = RefProp<HTMLDivElement> & ReactAriaTabPanelProps & {
  classNameOverrides?: ClassNameOverrides<typeof tabPanelStyles>;
};
