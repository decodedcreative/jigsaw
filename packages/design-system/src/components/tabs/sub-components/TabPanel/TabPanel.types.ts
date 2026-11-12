import type { TabPanelProps as ReactAriaTabPanelProps } from "react-aria-components";
import type { ClassNameOverrides } from "@jsw-types/component-props";
import type { tabPanelStyles } from "./TabPanel.styles";

export type TabPanelProps = ReactAriaTabPanelProps & {
  classNameOverrides?: ClassNameOverrides<typeof tabPanelStyles>;
};
