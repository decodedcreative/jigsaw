"use client";

import * as React from "react";
import { CaretDownIcon } from "@phosphor-icons/react";
import { Icon } from "@components/icon";
import {
  Select as ReactAriaSelect,
  Label as ReactAriaLabel,
  Button as ReactAriaButton,
  SelectValue as ReactAriaSelectValue,
  Popover as ReactAriaPopover,
  ListBox as ReactAriaListBox,
  Text as ReactAriaText,
} from "react-aria-components";
import { useGetClassNames } from "@hooks";
import { selectStyles } from "./Select.styles";
import type { SelectProps } from "./Select.types";

export function Select<T extends object>(props: SelectProps<T>) {
  const {
    label,
    description,
    errorMessage,
    placeholder = "Select an option",
    items,
    children,
    size = "md",
    classNameOverrides,
    isDisabled,
    isInvalid,
    ...rest
  } = props;
  const state = isDisabled ? "disabled" : isInvalid || errorMessage ? "error" : "default";

  const classNames = useGetClassNames(selectStyles, classNameOverrides, {
    wrapper: {},
    label: { state },
    trigger: { size, state },
    chevron: { size },
    popover: {},
    listbox: {},
    description: { state },
  });

  return (
    <ReactAriaSelect
      className={classNames.wrapper}
      isDisabled={isDisabled}
      isInvalid={isInvalid || !!errorMessage}
      {...rest}
    >
      {label && <ReactAriaLabel className={classNames.label}>{label}</ReactAriaLabel>}
      <ReactAriaButton className={classNames.trigger}>
        <ReactAriaSelectValue className="flex-1 text-left truncate">
          {({ selectedText }) => selectedText || placeholder}
        </ReactAriaSelectValue>
        <Icon icon={CaretDownIcon} classNameOverrides={{ component: [classNames.chevron] }} />
      </ReactAriaButton>
      {(description || errorMessage) && (
        <ReactAriaText
          slot={errorMessage ? "errorMessage" : "description"}
          className={classNames.description}
        >
          {errorMessage || description}
        </ReactAriaText>
      )}
      <ReactAriaPopover className={classNames.popover}>
        <ReactAriaListBox className={classNames.listbox} items={items}>
          {children as (item: T) => React.ReactNode}
        </ReactAriaListBox>
      </ReactAriaPopover>
    </ReactAriaSelect>
  );
}

Select.displayName = "DS_Select";
