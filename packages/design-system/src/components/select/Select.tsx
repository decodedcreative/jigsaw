"use client";

import { CaretDownIcon } from "@phosphor-icons/react/CaretDown";
import { useMemo } from "react";
import {
  Select as ReactAriaSelect,
  Label as ReactAriaLabel,
  Button as ReactAriaButton,
  SelectValue as ReactAriaSelectValue,
  Popover as ReactAriaPopover,
  ListBox as ReactAriaListBox,
  Text as ReactAriaText,
} from "react-aria-components";
import { usePartProps, useRootClassName, useAccessibleNameWarning } from "@hooks";
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
  ref,
  ...props
}: SelectProps) => {
  const nameRef = useAccessibleNameWarning("Select", ref, {
    // The trigger's computed name includes the placeholder or selected value,
    // which doesn't say what the field is for. Only a real label counts.
    isNamed: () => Boolean(label || props["aria-label"] || props["aria-labelledby"]),
  });
  const state = isDisabled ? "disabled" : isInvalid || errorMessage ? "error" : "default";
  const { item: itemClassNameOverride, ...selectClassNameOverrides } = classNameOverrides ?? {};

  const parts = usePartProps("select", selectStyles, selectClassNameOverrides, {
    label: { state },
    trigger: { size, state },
    description: { state },
  });
  const rootClassName = useRootClassName(parts.component.className, className);

  const contextValue = useMemo(
    () => ({ itemClassNameOverride }),
    [itemClassNameOverride]
  );

  return (
    <SelectProvider value={contextValue}>
      <ReactAriaSelect
        {...parts.component}
        className={rootClassName}
        isDisabled={isDisabled}
        isInvalid={isInvalid || !!errorMessage}
        {...props}
      ref={nameRef}
      >
        {label && <ReactAriaLabel {...parts.label}>{label}</ReactAriaLabel>}
        <div {...parts.fieldBody}>
          <ReactAriaButton {...parts.trigger}>
            <ReactAriaSelectValue className="flex-1 text-left truncate">
              {({ selectedText }) => selectedText || placeholder}
            </ReactAriaSelectValue>
            <Icon icon={CaretDownIcon} size={size} classNameOverrides={{ component: parts.chevron.className }} />
          </ReactAriaButton>
          {(description || errorMessage) && (
            <ReactAriaText
              slot={errorMessage ? "errorMessage" : "description"}
              {...parts.description}
            >
              {errorMessage || description}
            </ReactAriaText>
          )}
        </div>
        <ReactAriaPopover {...parts.popover}>
          <ReactAriaListBox {...parts.listbox}>{children}</ReactAriaListBox>
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
