"use client";

import type { FC } from "react";
import { DisclosureGroup as ReactAriaDisclosureGroup } from "react-aria-components";
import { useGetClassNames } from "@hooks";
import { disclosureGroupStyles } from "./DisclosureGroup.styles";
import type { DisclosureGroupProps } from "./DisclosureGroup.types";

export const DisclosureGroup: FC<DisclosureGroupProps> = ({
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
