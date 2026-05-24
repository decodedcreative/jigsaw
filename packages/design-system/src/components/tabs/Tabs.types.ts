import type { TabsProps as ReactAriaTabsProps } from "react-aria-components";
import type { WithoutClassName } from "../../types/component-props";

export type TabsProps = WithoutClassName<ReactAriaTabsProps> & {
  classNameOverrides?: Record<string, string[]>;
};
