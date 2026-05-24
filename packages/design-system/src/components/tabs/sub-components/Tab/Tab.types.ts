import type { TabProps as ReactAriaTabProps } from "react-aria-components";
import type { TabsVariant } from "../TabList/TabList.styles";
import type { WithoutClassName } from "../../../../types/component-props";

export type TabProps = WithoutClassName<ReactAriaTabProps> & {
  variant?: TabsVariant;
  classNameOverrides?: Record<string, string[]>;
};
