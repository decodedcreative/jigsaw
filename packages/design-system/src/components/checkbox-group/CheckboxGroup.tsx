"use client";

import { useMemo } from "react";
import {
  CheckboxGroup as ReactAriaCheckboxGroup,
  Label as ReactAriaLabel,
  Text as ReactAriaText,
} from "react-aria-components";
import { useGetClassNames, useRootClassName } from "@hooks";
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

  const classNames = useGetClassNames(checkboxGroupStyles, classNameOverrides, {
    label: { state },
  });
  const rootClassName = useRootClassName(classNames.group, className);

  const contextValue = useMemo(() => ({ groupHasError }), [groupHasError]);

  return (
    <CheckboxGroupProvider value={contextValue}>
      <ReactAriaCheckboxGroup
        className={rootClassName}
        isDisabled={isDisabled}
        isInvalid={groupHasError}
        {...props}
      >
        {label && <ReactAriaLabel className={classNames.label}>{label}</ReactAriaLabel>}
        <div className={classNames.fieldBody}>
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
        </div>
      </ReactAriaCheckboxGroup>
    </CheckboxGroupProvider>
  );
};

CheckboxGroup.displayName = "DS_CheckboxGroup";
