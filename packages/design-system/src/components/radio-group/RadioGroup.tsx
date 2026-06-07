"use client";

import { useMemo } from "react";
import {
  RadioGroup as ReactAriaRadioGroup,
  Label as ReactAriaLabel,
  Text as ReactAriaText,
} from "react-aria-components";
import { useGetClassNames, useRootClassName } from "@hooks";
import { radioGroupStyles } from "./RadioGroup.styles";
import { RadioGroupProvider } from "./RadioGroupContext";
import { RadioGroupItem } from "./RadioGroupItem";
import type { RadioGroupProps } from "./RadioGroup.types";

export const RadioGroup = ({
  label,
  description,
  errorMessage,
  children,
  classNameOverrides,
  className,
  isDisabled,
  isInvalid,
  ...props
}: RadioGroupProps) => {
  const groupHasError = isInvalid || !!errorMessage;
  const state = isDisabled ? "disabled" : groupHasError ? "error" : "default";
  const { item: itemClassNameOverrides, ...groupClassNameOverrides } = classNameOverrides ?? {};

  const classNames = useGetClassNames(radioGroupStyles, groupClassNameOverrides, {
    label: { state },
  });
  const rootClassName = useRootClassName(classNames.group, className);

  const contextValue = useMemo(
    () => ({ itemClassNameOverrides, groupHasError }),
    [itemClassNameOverrides, groupHasError]
  );

  return (
    <RadioGroupProvider value={contextValue}>
      <ReactAriaRadioGroup
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
      </ReactAriaRadioGroup>
    </RadioGroupProvider>
  );
};

RadioGroup.displayName = "DS_RadioGroup";
RadioGroup.Item = RadioGroupItem;

export type RadioGroupComponent = typeof RadioGroup & {
  Item: typeof RadioGroupItem;
};
