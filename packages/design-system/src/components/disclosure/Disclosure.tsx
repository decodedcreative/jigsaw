"use client";

import * as React from "react";
import {
  Disclosure as AriaDisclosure,
  DisclosureGroup as AriaDisclosureGroup,
  DisclosurePanel,
  Button,
  type DisclosureProps as AriaDisclosureProps,
  type DisclosureGroupProps as AriaDisclosureGroupProps,
} from "react-aria-components";
import { useGetClassNames } from "@hooks";
import { disclosureStyles, disclosureGroupStyles } from "./Disclosure.styles";

export type DisclosureProps = AriaDisclosureProps & {
  title: string;
  children?: React.ReactNode;
  classNameOverrides?: Record<string, string[]>;
};

export const Disclosure = ({
  title,
  children,
  classNameOverrides,
  ...props
}: DisclosureProps) => {
  const classNames = useGetClassNames(disclosureStyles, classNameOverrides, {
    wrapper: {},
    trigger: {},
    chevron: {},
    panel: {},
  });

  return (
    <AriaDisclosure className={`group ${classNames.wrapper}`} {...props}>
      <Button slot="trigger" className={classNames.trigger}>
        <span>{title}</span>
        <svg className={classNames.chevron} viewBox="0 0 16 16" fill="none">
          <path
            d="M4 6L8 10L12 6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Button>
      <DisclosurePanel className={classNames.panel}>{children}</DisclosurePanel>
    </AriaDisclosure>
  );
};

Disclosure.displayName = "DS_Disclosure";

export type DisclosureGroupProps = Omit<AriaDisclosureGroupProps, "children"> & {
  children?: React.ReactNode;
  classNameOverrides?: Record<string, string[]>;
};

export const DisclosureGroup = ({
  children,
  classNameOverrides,
  ...props
}: DisclosureGroupProps) => {
  const classNames = useGetClassNames(disclosureGroupStyles, classNameOverrides, {
    wrapper: {},
  });

  return (
    <AriaDisclosureGroup className={classNames.wrapper} {...props}>
      {children}
    </AriaDisclosureGroup>
  );
};

DisclosureGroup.displayName = "DS_DisclosureGroup";
