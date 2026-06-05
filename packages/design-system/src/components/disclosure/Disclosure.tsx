"use client";

import {
  Disclosure as ReactAriaDisclosure,
  DisclosurePanel,
  Button,
} from "react-aria-components";
import { useGetClassNames, useRootClassName } from "@hooks";
import { disclosureStyles } from "./Disclosure.styles";
import type { DisclosureProps } from "./Disclosure.types";

export function Disclosure({
  title,
  children,
  classNameOverrides,
  className,
  ...props
}: DisclosureProps) {
  const classNames = useGetClassNames(disclosureStyles, classNameOverrides);
  const rootClassName = useRootClassName(classNames.component, className);

  return (
    <ReactAriaDisclosure className={rootClassName} {...props}>
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
}

Disclosure.displayName = "DS_Disclosure";
