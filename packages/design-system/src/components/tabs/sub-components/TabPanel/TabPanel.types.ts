import type { TabPanelProps as ReactAriaTabPanelProps } from "react-aria-components";
import type { WithoutClassName } from "../../../../types/component-props";

export type TabPanelProps = WithoutClassName<ReactAriaTabPanelProps> & {
  classNameOverrides?: Record<string, string[]>;
};
