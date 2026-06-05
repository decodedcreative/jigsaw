"use client";

import { DisclosureGroup as ReactAriaDisclosureGroup } from "react-aria-components";
import { useGetClassNames, useRootClassName } from "@hooks";
import { disclosureGroupStyles } from "./DisclosureGroup.styles";
import type { DisclosureGroupProps } from "./Disclosure.types";

export function DisclosureGroup({
  children,
  classNameOverrides,
  className,
  ...props
}: DisclosureGroupProps) {
  const classNames = useGetClassNames(disclosureGroupStyles, classNameOverrides);
  const rootClassName = useRootClassName(classNames.component, className);

  return (
    <ReactAriaDisclosureGroup className={rootClassName} {...props}>
      {children}
    </ReactAriaDisclosureGroup>
  );
}

DisclosureGroup.displayName = "DS_DisclosureGroup";
