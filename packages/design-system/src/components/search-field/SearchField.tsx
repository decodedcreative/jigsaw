"use client";

import { MagnifyingGlassIcon, XIcon } from "@phosphor-icons/react";
import {
  SearchField as ReactAriaSearchField,
  Label as ReactAriaLabel,
  Input as ReactAriaInput,
  Button as ReactAriaButton,
  Text as ReactAriaText,
} from "react-aria-components";
import { useGetClassNames, useRootClassName } from "@hooks";
import { Icon } from "@components/icon";
import { searchFieldStyles } from "./SearchField.styles";
import type { SearchFieldProps } from "./SearchField.types";

export const SearchField = ({
  label,
  description,
  errorMessage,
  placeholder = "Search...",
  size = "md",
  classNameOverrides,
  className,
  isDisabled,
  isInvalid,
  ...props
}: SearchFieldProps) => {
  const state = isDisabled ? "disabled" : isInvalid || errorMessage ? "error" : "default";

  const classNames = useGetClassNames(searchFieldStyles, classNameOverrides, {
    label: { state },
    input: { size, state },
    clearButton: { size },
    description: { state },
  });
  const rootClassName = useRootClassName(classNames.wrapper, className);

  return (
    <ReactAriaSearchField
      className={rootClassName}
      isDisabled={isDisabled}
      isInvalid={isInvalid || !!errorMessage}
      {...props}
    >
      {label && <ReactAriaLabel className={classNames.label}>{label}</ReactAriaLabel>}
      <div className={classNames.fieldBody}>
        <div className={classNames.inputWrapper}>
          <Icon
            icon={MagnifyingGlassIcon}
            size={size}
            classNameOverrides={{ component: classNames.searchIcon }}
          />
          <ReactAriaInput className={classNames.input} placeholder={placeholder} />
          <ReactAriaButton className={classNames.clearButton}>
            <Icon icon={XIcon} size="sm" />
          </ReactAriaButton>
        </div>
        {(description || errorMessage) && (
          <ReactAriaText
            slot={errorMessage ? "errorMessage" : "description"}
            className={classNames.description}
          >
            {errorMessage || description}
          </ReactAriaText>
        )}
      </div>
    </ReactAriaSearchField>
  );
};

SearchField.displayName = "DS_SearchField";
