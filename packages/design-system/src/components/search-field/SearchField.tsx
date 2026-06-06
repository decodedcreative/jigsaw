"use client";

import { MagnifyingGlassIcon, XIcon } from "@phosphor-icons/react";
import {
  SearchField as ReactAriaSearchField,
  Label as ReactAriaLabel,
  Input as ReactAriaInput,
  Button as ReactAriaButton,
  Text as ReactAriaText,
} from "react-aria-components";
import { useGetClassNames } from "@hooks";
import { Icon } from "@components/icon";
import { searchFieldStyles } from "./SearchField.styles";
import type { SearchFieldProps } from "./SearchField.types";

export const SearchField = ({
  label,
  description,
  placeholder = "Search...",
  size = "md",
  classNameOverrides,
  isDisabled,
  ...props
}: SearchFieldProps) => {
  const state = isDisabled ? "disabled" : "default";

  const classNames = useGetClassNames(searchFieldStyles, classNameOverrides, {
    label: { state },
    input: { size, state },
    clearButton: { size },
  });

  return (
    <ReactAriaSearchField className={classNames.wrapper} isDisabled={isDisabled} {...props}>
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
        {description && (
          <ReactAriaText slot="description" className={classNames.description}>
            {description}
          </ReactAriaText>
        )}
      </div>
    </ReactAriaSearchField>
  );
};

SearchField.displayName = "DS_SearchField";
