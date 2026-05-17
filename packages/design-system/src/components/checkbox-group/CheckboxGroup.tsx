"use client";

import * as React from "react";
import {
  CheckboxGroup as AriaCheckboxGroup,
  Label,
  Text,
  type CheckboxGroupProps as AriaCheckboxGroupProps,
} from "react-aria-components";
import { useGetClassNames } from "@hooks";
import { checkboxGroupStyles } from "./CheckboxGroup.styles";

export type CheckboxGroupProps = Omit<AriaCheckboxGroupProps, "children"> & {
  label?: string;
  description?: string;
  errorMessage?: string;
  children?: React.ReactNode;
  classNameOverrides?: Record<string, string[]>;
};

export const CheckboxGroup = ({
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
    <AriaCheckboxGroup
      className={classNames.group}
      isDisabled={isDisabled}
      isInvalid={isInvalid || !!errorMessage}
      {...props}
    >
      {label && <Label className={classNames.label}>{label}</Label>}
      {description && (
        <Text slot="description" className={classNames.description}>
          {description}
        </Text>
      )}
      <div className={classNames.options}>{children}</div>
      {errorMessage && (
        <Text slot="errorMessage" className={classNames.errorMessage}>
          {errorMessage}
        </Text>
      )}
    </AriaCheckboxGroup>
  );
};

CheckboxGroup.displayName = "DS_CheckboxGroup";
