"use client";

import { DisclosureGroup as ReactAriaDisclosureGroup } from "react-aria-components";
import { usePartProps, useRootClassName } from "@hooks";
import { disclosureGroupStyles } from "./DisclosureGroup.styles";
import type { DisclosureGroupProps } from "./Disclosure.types";

export function DisclosureGroup({
  children,
  classNameOverrides,
  className,
  ...props
}: DisclosureGroupProps) {
  const parts = usePartProps("disclosure-group", disclosureGroupStyles, classNameOverrides);
  const rootClassName = useRootClassName(parts.component.className, className);

  return (
    <ReactAriaDisclosureGroup {...props} {...parts.component} className={rootClassName}>
      {children}
    </ReactAriaDisclosureGroup>
  );
}

DisclosureGroup.displayName = "DS_DisclosureGroup";
