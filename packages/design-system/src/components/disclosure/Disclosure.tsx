"use client";

import * as React from "react";
import {
  Disclosure as ReactAriaDisclosure,
  DisclosureGroup as ReactAriaDisclosureGroup,
  DisclosurePanel,
  Button,
  type DisclosureProps as ReactAriaDisclosureProps,
  type DisclosureGroupProps as ReactAriaDisclosureGroupProps,
} from "react-aria-components";
import { useGetClassNames } from "@hooks";
import { disclosureStyles, disclosureGroupStyles } from "./Disclosure.styles";

export type DisclosureProps = ReactAriaDisclosureProps & {
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
    <ReactAriaDisclosure className={`group ${classNames.wrapper}`} {...props}>
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
    </ReactAriaDisclosure>
  );
};

Disclosure.displayName = "DS_Disclosure";

export type DisclosureGroupProps = Omit<ReactAriaDisclosureGroupProps, "children"> & {
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
    <ReactAriaDisclosureGroup className={classNames.wrapper} {...props}>
      {children}
    </ReactAriaDisclosureGroup>
  );
};

DisclosureGroup.displayName = "DS_DisclosureGroup";
