"use client";

import {
  Disclosure as ReactAriaDisclosure,
  DisclosurePanel,
  Button,
} from "react-aria-components";
import { usePartProps, useRootClassName } from "@hooks";
import { disclosureStyles } from "./Disclosure.styles";
import type { DisclosureProps } from "./Disclosure.types";

export function Disclosure({
  title,
  children,
  classNameOverrides,
  className,
  ...props
}: DisclosureProps) {
  const parts = usePartProps("disclosure", disclosureStyles, classNameOverrides);
  const rootClassName = useRootClassName(parts.component.className, className);

  return (
    <ReactAriaDisclosure {...props} {...parts.component} className={rootClassName}>
      {/* TODO(JSW-22): Refactor trigger to DS Button with `media`/`mediaPosition` for the chevron
          instead of an inline SVG child once Button icon layout support merges. */}
      <Button slot="trigger" {...parts.trigger}>
        <span>{title}</span>
        <svg {...parts.chevron} viewBox="0 0 16 16" fill="none">
          <path
            d="M4 6L8 10L12 6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Button>
      <DisclosurePanel {...parts.panel}>{children}</DisclosurePanel>
    </ReactAriaDisclosure>
  );
}

Disclosure.displayName = "DS_Disclosure";
