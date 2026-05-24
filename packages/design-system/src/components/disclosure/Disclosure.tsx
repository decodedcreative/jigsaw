"use client";

import type { FC } from "react";
import { CaretDownIcon } from "@phosphor-icons/react";
import { Icon } from "@components/icon";
import {
  Disclosure as ReactAriaDisclosure,
  DisclosurePanel as ReactAriaDisclosurePanel,
  Button as ReactAriaButton,
} from "react-aria-components";
import { useGetClassNames } from "@hooks";
import { disclosureStyles } from "./Disclosure.styles";
import type { DisclosureProps } from "./Disclosure.types";

export const Disclosure: FC<DisclosureProps> = ({
  title,
  children,
  classNameOverrides,
  ...props
}: DisclosureProps) => {
  const classNames = useGetClassNames(disclosureStyles, classNameOverrides);

  return (
    <ReactAriaDisclosure className={`group ${classNames.wrapper}`} {...props}>
      <ReactAriaButton slot="trigger" className={classNames.trigger}>
        <span>{title}</span>
        <Icon icon={CaretDownIcon} classNameOverrides={{ component: [classNames.chevron] }} />
      </ReactAriaButton>
      <ReactAriaDisclosurePanel className={classNames.panel}>{children}</ReactAriaDisclosurePanel>
    </ReactAriaDisclosure>
  );
};

Disclosure.displayName = "DS_Disclosure";
