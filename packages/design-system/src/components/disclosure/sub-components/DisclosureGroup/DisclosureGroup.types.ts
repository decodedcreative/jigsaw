import type * as React from "react";
import type { DisclosureGroupProps as ReactAriaDisclosureGroupProps } from "react-aria-components";
import type { WithoutClassName } from "../../../../types/component-props";

export type DisclosureGroupProps = WithoutClassName<Omit<ReactAriaDisclosureGroupProps, "children">> & {
  children?: React.ReactNode;
  classNameOverrides?: Record<string, string[]>;
};
