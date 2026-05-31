"use client";

import * as React from "react";
import {
  SearchField as ReactAriaSearchField,
  Label,
  Input,
  Button,
  Text,
  type SearchFieldProps as ReactAriaSearchFieldProps,
} from "react-aria-components";
import { MagnifyingGlassIcon, XIcon } from "@phosphor-icons/react";
import { useGetClassNames } from "@hooks";
import { Icon } from "../icon";
import { searchFieldStyles } from "./SearchField.styles";
import type { ClassNameOverrides, WithoutClassName } from "@jsw-types/component-props";

export type SearchFieldProps = Omit<ReactAriaSearchFieldProps, "children"> & {
  label?: string;
  description?: string;
  placeholder?: string;
  classNameOverrides?: ClassNameOverrides<typeof searchFieldStyles>;
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
    searchIcon: {},
    input: { size, state },
    clearButton: { size },
    description: {},
  });

  return (
    <ReactAriaSearchField className={classNames.wrapper} isDisabled={isDisabled} {...props}>
      {label && <Label className={classNames.label}>{label}</Label>}
      <div className={classNames.inputWrapper}>
        <Icon
          icon={MagnifyingGlassIcon}
          size={size}
          classNameOverrides={{ component: classNames.searchIcon }}
        />
        <Input className={classNames.input} placeholder={placeholder} />
        <Button className={classNames.clearButton}>
          <Icon icon={XIcon} size="sm" />
        </Button>
      </div>
      {description && (
        <Text slot="description" className={classNames.description}>
          {description}
        </Text>
      )}
    </ReactAriaSearchField>
  );
};

SearchField.displayName = "DS_SearchField";
