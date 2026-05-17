"use client";

import * as React from "react";
import {
  SearchField as AriaSearchField,
  Label,
  Input,
  Button,
  Text,
  type SearchFieldProps as AriaSearchFieldProps,
} from "react-aria-components";
import { useGetClassNames } from "@hooks";
import { searchFieldStyles } from "./SearchField.styles";

export type SearchFieldProps = Omit<AriaSearchFieldProps, "children"> & {
  label?: string;
  description?: string;
  placeholder?: string;
  classNameOverrides?: Record<string, string[]>;
  size?: "sm" | "md" | "lg";
};

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
    wrapper: {},
    label: { state },
    inputWrapper: {},
    searchIcon: { size },
    input: { size, state },
    clearButton: { size },
    description: {},
  });

  return (
    <AriaSearchField className={classNames.wrapper} isDisabled={isDisabled} {...props}>
      {label && <Label className={classNames.label}>{label}</Label>}
      <div className={classNames.inputWrapper}>
        <svg className={classNames.searchIcon} viewBox="0 0 16 16" fill="none">
          <path
            d="M7 12C9.76142 12 12 9.76142 12 7C12 4.23858 9.76142 2 7 2C4.23858 2 2 4.23858 2 7C2 9.76142 4.23858 12 7 12Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M14 14L10.5 10.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <Input className={classNames.input} placeholder={placeholder} />
        <Button className={classNames.clearButton}>
          <svg className="h-3.5 w-3.5" viewBox="0 0 14 14" fill="none">
            <path
              d="M11 3L3 11M3 3L11 11"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </Button>
      </div>
      {description && (
        <Text slot="description" className={classNames.description}>
          {description}
        </Text>
      )}
    </AriaSearchField>
  );
};

SearchField.displayName = "DS_SearchField";
