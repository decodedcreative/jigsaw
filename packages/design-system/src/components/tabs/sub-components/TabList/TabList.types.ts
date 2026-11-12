import type { VariantProps } from "class-variance-authority";
import type { TabListProps as ReactAriaTabListProps } from "react-aria-components";
import type { ClassNameOverrides } from "@jsw-types/component-props";
import type { tabListStyles } from "./TabList.styles";

export type TabsVariant = NonNullable<VariantProps<typeof tabListStyles.component>["variant"]>;

export type TabListProps<T extends object> = ReactAriaTabListProps<T> & {
  variant?: TabsVariant;
  classNameOverrides?: ClassNameOverrides<typeof tabListStyles>;
};
