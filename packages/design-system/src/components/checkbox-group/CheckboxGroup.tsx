"use client";

import { useMemo } from "react";
import {
  CheckboxGroup as ReactAriaCheckboxGroup,
  Label as ReactAriaLabel,
  Text as ReactAriaText,
} from "react-aria-components";
import { usePartProps, useRootClassName } from "@hooks";
import { checkboxGroupStyles } from "./CheckboxGroup.styles";
import { CheckboxGroupProvider } from "./CheckboxGroupContext";
import type { CheckboxGroupProps } from "./CheckboxGroup.types";

export const CheckboxGroup = ({
  label,
  description,
  errorMessage,
  children,
  classNameOverrides,
  className,
  isDisabled,
  isInvalid,
  ...props
}: CheckboxGroupProps) => {
  const groupHasError = isInvalid || !!errorMessage;
  const state = isDisabled ? "disabled" : groupHasError ? "error" : "default";

  const parts = usePartProps("checkbox-group", checkboxGroupStyles, classNameOverrides, {
    label: { state },
  });
  const rootClassName = useRootClassName(parts.component.className, className);

  const contextValue = useMemo(() => ({ groupHasError }), [groupHasError]);

  return (
    <CheckboxGroupProvider value={contextValue}>
      <ReactAriaCheckboxGroup
        isDisabled={isDisabled}
        isInvalid={groupHasError}
        {...props}
        {...parts.component}
        className={rootClassName}
      >
        {label && <ReactAriaLabel {...parts.label}>{label}</ReactAriaLabel>}
        <div {...parts.fieldBody}>
          {description && (
            <ReactAriaText slot="description" {...parts.description}>
              {description}
            </ReactAriaText>
          )}
          <div {...parts.options}>{children}</div>
          {errorMessage && (
            <ReactAriaText slot="errorMessage" {...parts.errorMessage}>
              {errorMessage}
            </ReactAriaText>
          )}
        </div>
      </ReactAriaCheckboxGroup>
    </CheckboxGroupProvider>
  );
};

CheckboxGroup.displayName = "DS_CheckboxGroup";
