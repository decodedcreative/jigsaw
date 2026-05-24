"use client";

import type { FC } from "react";
import {
  CheckboxGroup as ReactAriaCheckboxGroup,
  Label as ReactAriaLabel,
  Text as ReactAriaText,
} from "react-aria-components";
import { useGetClassNames } from "@hooks";
import { checkboxGroupStyles } from "./CheckboxGroup.styles";
import type { CheckboxGroupProps } from "./CheckboxGroup.types";

export const CheckboxGroup: FC<CheckboxGroupProps> = ({
  label,
  description,
  errorMessage,
  children,
  classNameOverrides,
  isDisabled,
  isInvalid,
  ...props
}: CheckboxGroupProps) => {
  const state = isDisabled ? "disabled" : isInvalid || errorMessage ? "error" : "default";

  const classNames = useGetClassNames(checkboxGroupStyles, classNameOverrides, {
    group: {},
    label: { state },
    description: {},
    errorMessage: {},
    options: {},
  });

  return (
    <ReactAriaCheckboxGroup
      className={classNames.group}
      isDisabled={isDisabled}
      isInvalid={isInvalid || !!errorMessage}
      {...props}
    >
      {label && <ReactAriaLabel className={classNames.label}>{label}</ReactAriaLabel>}
      {description && (
        <ReactAriaText slot="description" className={classNames.description}>
          {description}
        </ReactAriaText>
      )}
      <div className={classNames.options}>{children}</div>
      {errorMessage && (
        <ReactAriaText slot="errorMessage" className={classNames.errorMessage}>
          {errorMessage}
        </ReactAriaText>
      )}
    </ReactAriaCheckboxGroup>
  );
};

CheckboxGroup.displayName = "DS_CheckboxGroup";
