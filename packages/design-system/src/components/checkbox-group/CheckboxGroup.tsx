"use client";

import * as React from "react";
import {
  CheckboxGroup as ReactAriaCheckboxGroup,
  Label,
  Text,
  type CheckboxGroupProps as ReactAriaCheckboxGroupProps,
} from "react-aria-components";
import { useGetClassNames } from "@hooks";
import { checkboxGroupStyles } from "./CheckboxGroup.styles";
import type { ClassNameOverrides, WithoutClassName } from "@jsw-types/component-props";

export type CheckboxGroupProps = Omit<ReactAriaCheckboxGroupProps, "children"> & {
  label?: string;
  description?: string;
  errorMessage?: string;
  children?: React.ReactNode;
  classNameOverrides?: ClassNameOverrides<typeof checkboxGroupStyles>;
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
      {label && <Label className={classNames.label}>{label}</Label>}
      <div className={classNames.fieldBody}>
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
      </div>
    </ReactAriaCheckboxGroup>
  );
};

CheckboxGroup.displayName = "DS_CheckboxGroup";
