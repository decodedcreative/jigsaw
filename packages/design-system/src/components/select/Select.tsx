"use client";

import { CaretDownIcon } from "@phosphor-icons/react";
import {
  Select as ReactAriaSelect,
  Label as ReactAriaLabel,
  Button as ReactAriaButton,
  SelectValue as ReactAriaSelectValue,
  Popover as ReactAriaPopover,
  ListBox as ReactAriaListBox,
  ListBoxItem as ReactAriaListBoxItem,
  Text as ReactAriaText,
} from "react-aria-components";
import { useGetClassNames, useRootClassName } from "@hooks";
import { Icon } from "@components/icon";
import { selectStyles } from "./Select.styles";
import type { SelectItemProps, SelectProps } from "./Select.types";

export const Select = ({
  label,
  description,
  errorMessage,
  placeholder = "Select an option",
  children,
  size = "md",
  classNameOverrides,
  className,
  isDisabled,
  isInvalid,
  ...props
}: SelectProps) => {
  const state = isDisabled ? "disabled" : isInvalid || errorMessage ? "error" : "default";

  const classNames = useGetClassNames(selectStyles, classNameOverrides, {
    label: { state },
    trigger: { size, state },
    description: { state },
  });
  const rootClassName = useRootClassName(classNames.wrapper, className);

  return (
    <ReactAriaSelect
      className={rootClassName}
      isDisabled={isDisabled}
      isInvalid={isInvalid || !!errorMessage}
      {...props}
    >
      {label && <ReactAriaLabel className={classNames.label}>{label}</ReactAriaLabel>}
      <div className={classNames.fieldBody}>
        <ReactAriaButton className={classNames.trigger}>
          <ReactAriaSelectValue className="flex-1 text-left truncate">
            {({ selectedText }) => selectedText || placeholder}
          </ReactAriaSelectValue>
          <Icon icon={CaretDownIcon} size={size} classNameOverrides={{ component: classNames.chevron }} />
        </ReactAriaButton>
        {(description || errorMessage) && (
          <ReactAriaText
            slot={errorMessage ? "errorMessage" : "description"}
            className={classNames.description}
          >
            {errorMessage || description}
          </ReactAriaText>
        )}
      </div>
      <ReactAriaPopover className={classNames.popover}>
        <ReactAriaListBox className={classNames.listbox}>
          {children}
        </ReactAriaListBox>
      </ReactAriaPopover>
    </ReactAriaSelect>
  );
};

const SelectItem = ({ children, ...props }: SelectItemProps) => (
  <ReactAriaListBoxItem className={selectStyles.item()} {...props}>
    {children}
  </ReactAriaListBoxItem>
);

Select.displayName = "DS_Select";
SelectItem.displayName = "DS_Select.Item";
Select.Item = SelectItem;

export type SelectComponent = typeof Select & {
  Item: typeof SelectItem;
};
