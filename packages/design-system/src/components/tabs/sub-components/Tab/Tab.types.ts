import type { TabProps as ReactAriaTabProps } from "react-aria-components";
import type { ClassNameOverrides, WithoutClassName } from "@jsw-types/component-props";
import type { TabsVariant } from "../TabList/TabList.types";
import type { tabStyles } from "./Tab.styles";

export type TabProps = WithoutClassName<ReactAriaTabProps> & {
  variant?: TabsVariant;
  classNameOverrides?: ClassNameOverrides<typeof tabStyles>;
};
