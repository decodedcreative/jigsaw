"use client";

import { MagnifyingGlassIcon } from "@phosphor-icons/react/MagnifyingGlass";
import { XIcon } from "@phosphor-icons/react/X";
import {
  SearchField as ReactAriaSearchField,
  Label as ReactAriaLabel,
  Input as ReactAriaInput,
  Button as ReactAriaButton,
  Text as ReactAriaText,
} from "react-aria-components";
import { usePartProps, useRootClassName, useAccessibleNameWarning } from "@hooks";
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
  ref,
  ...props
}: SearchFieldProps) => {
  const nameRef = useAccessibleNameWarning("SearchField", ref, { target: "input" });
  const state = isDisabled ? "disabled" : isInvalid || errorMessage ? "error" : "default";
  // A search box often has no visible label. Name it "Search" unless the app
  // gives it a label or its own aria-label / aria-labelledby (JSW-128).
  const defaultAriaLabel =
    !label && !props["aria-label"] && !props["aria-labelledby"] ? "Search" : undefined;

  const parts = usePartProps("search-field", searchFieldStyles, classNameOverrides, {
    label: { state },
    input: { size, state },
    clearButton: { size },
    description: { state },
  });
  const rootClassName = useRootClassName(parts.component.className, className);

  return (
    <ReactAriaSearchField
      {...parts.component}
      className={rootClassName}
      isDisabled={isDisabled}
      isInvalid={isInvalid || !!errorMessage}
      aria-label={defaultAriaLabel}
      {...props}
      ref={nameRef}
    >
      {label && <ReactAriaLabel {...parts.label}>{label}</ReactAriaLabel>}
      <div {...parts.fieldBody}>
        <div {...parts.inputWrapper}>
          <Icon
            icon={MagnifyingGlassIcon}
            size={size}
            classNameOverrides={{ component: parts.searchIcon.className }}
          />
          <ReactAriaInput {...parts.input} placeholder={placeholder} />
          <ReactAriaButton {...parts.clearButton}>
            <Icon icon={XIcon} size="sm" />
          </ReactAriaButton>
        </div>
        {(description || errorMessage) && (
          <ReactAriaText
            slot={errorMessage ? "errorMessage" : "description"}
            {...parts.description}
          >
            {errorMessage || description}
          </ReactAriaText>
        )}
      </div>
    </ReactAriaSearchField>
  );
};

SearchField.displayName = "DS_SearchField";
