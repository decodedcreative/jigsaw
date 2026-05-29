"use client";

import * as React from "react";
import {
  Select as ReactAriaSelect,
  Label,
  Button,
  SelectValue,
  Popover,
  ListBox,
  ListBoxItem,
  Text,
  type SelectProps as ReactAriaSelectProps,
  type ListBoxItemProps,
} from "react-aria-components";
import { useGetClassNames } from "@hooks";
import { selectStyles } from "./Select.styles";
import type { ClassNameOverrides, WithoutClassName } from "../../types/component-props";

export type SelectProps<T extends object> = Omit<ReactAriaSelectProps<T>, "children"> & {
  label?: string;
  description?: string;
  errorMessage?: string;
  placeholder?: string;
  items?: Iterable<T>;
  children?: React.ReactNode | ((item: T) => React.ReactNode);
  classNameOverrides?: ClassNameOverrides<typeof selectStyles>;
  size?: "sm" | "md" | "lg";
};

export function Select<T extends object>({
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
  ...props
}: SelectProps<T>) {
  const state = isDisabled ? "disabled" : isInvalid || errorMessage ? "error" : "default";

  const classNames = useGetClassNames(selectStyles, classNameOverrides, {
    wrapper: {},
    label: { state },
    trigger: { size, state },
    chevron: { size },
    popover: {},
    listbox: {},
    item: {},
    description: { state },
  });

  return (
    <ReactAriaSelect
      className={classNames.wrapper}
      isDisabled={isDisabled}
      isInvalid={isInvalid || !!errorMessage}
      {...props}
    >
      {label && <Label className={classNames.label}>{label}</Label>}
      <Button className={classNames.trigger}>
        <SelectValue className="flex-1 text-left truncate">
          {({ selectedText }) => selectedText || placeholder}
        </SelectValue>
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
      {(description || errorMessage) && (
        <Text
          slot={errorMessage ? "errorMessage" : "description"}
          className={classNames.description}
        >
          {errorMessage || description}
        </Text>
      )}
      <Popover className={classNames.popover}>
        <ListBox className={classNames.listbox} items={items}>
          {children as (item: T) => React.ReactNode}
        </ListBox>
      </Popover>
    </ReactAriaSelect>
  );
}

Select.displayName = "DS_Select";

export type SelectItemProps = ListBoxItemProps;

export const SelectItem = ({ children, ...props }: SelectItemProps) => {
  const classNames = useGetClassNames(selectStyles, undefined, { item: {} });
  return (
    <ListBoxItem className={classNames.item} {...props}>
      {children}
    </ListBoxItem>
  );
};

SelectItem.displayName = "DS_SelectItem";
