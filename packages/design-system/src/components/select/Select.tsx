"use client";

import { useMemo } from "react";
import { CaretDownIcon } from "@phosphor-icons/react";
import {
  Select as ReactAriaSelect,
  Label as ReactAriaLabel,
  Button as ReactAriaButton,
  SelectValue as ReactAriaSelectValue,
  Popover as ReactAriaPopover,
  ListBox as ReactAriaListBox,
  Text as ReactAriaText,
} from "react-aria-components";
import { useGetClassNames, useRootClassName } from "@hooks";
import { Icon } from "@components/icon";
import { selectStyles } from "./Select.styles";
import { SelectProvider } from "./SelectContext";
import { SelectItem } from "./SelectItem";
import type { SelectProps } from "./Select.types";

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
  const { item: itemClassNameOverride, ...selectClassNameOverrides } = classNameOverrides ?? {};

  const classNames = useGetClassNames(selectStyles, selectClassNameOverrides, {
    label: { state },
    trigger: { size, state },
    description: { state },
  });
  const rootClassName = useRootClassName(classNames.wrapper, className);

  const contextValue = useMemo(
    () => ({ itemClassNameOverride }),
    [itemClassNameOverride]
  );

  return (
    <SelectProvider value={contextValue}>
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
          <ReactAriaListBox className={classNames.listbox}>{children}</ReactAriaListBox>
        </ReactAriaPopover>
      </ReactAriaSelect>
    </SelectProvider>
  );
};

Select.displayName = "DS_Select";
Select.Item = SelectItem;

export type SelectComponent = typeof Select & {
  Item: typeof SelectItem;
};
