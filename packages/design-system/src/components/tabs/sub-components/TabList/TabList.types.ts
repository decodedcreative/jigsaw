import type { TabListProps as ReactAriaTabListProps } from "react-aria-components";
import type { ClassNameOverrides, WithoutClassName } from "@jsw-types/component-props";
import type { TabsVariant, tabListStyles } from "./TabList.styles";

export type TabListProps<T extends object> = WithoutClassName<ReactAriaTabListProps<T>> & {
  variant?: TabsVariant;
  classNameOverrides?: ClassNameOverrides<typeof tabListStyles>;
};
