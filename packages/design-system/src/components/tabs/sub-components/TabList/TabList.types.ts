import type { TabListProps as ReactAriaTabListProps } from "react-aria-components";
import type { TabsVariant } from "./TabList.styles";

export type TabListProps<T extends object> = ReactAriaTabListProps<T> & {
  variant?: TabsVariant;
  classNameOverrides?: Record<string, string[]>;
};
