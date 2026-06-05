import type { ReactNode } from "react";
import type {
  DisclosureProps as ReactAriaDisclosureProps,
  DisclosureGroupProps as ReactAriaDisclosureGroupProps,
} from "react-aria-components";
import type { ClassNameOverrides } from "@jsw-types/component-props";
import type { disclosureStyles } from "./Disclosure.styles";
import type { disclosureGroupStyles } from "./DisclosureGroup.styles";

export type DisclosureProps = Omit<ReactAriaDisclosureProps, "children"> & {
  title: string;
  children?: ReactNode;
  classNameOverrides?: ClassNameOverrides<typeof disclosureStyles>;
};

export type DisclosureGroupProps = Omit<ReactAriaDisclosureGroupProps, "children"> & {
  children?: ReactNode;
  classNameOverrides?: ClassNameOverrides<typeof disclosureGroupStyles>;
};
