"use client";

import { useMemo } from "react";
import {
  RadioGroup as ReactAriaRadioGroup,
  Label as ReactAriaLabel,
  Text as ReactAriaText,
} from "react-aria-components";
import { usePartProps, useRootClassName } from "@hooks";
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

  const parts = usePartProps("radio-group", radioGroupStyles, groupClassNameOverrides, {
    label: { state },
  });
  const rootClassName = useRootClassName(parts.component.className, className);

  const contextValue = useMemo(
    () => ({ itemClassNameOverrides, groupHasError }),
    [itemClassNameOverrides, groupHasError]
  );

  return (
    <RadioGroupProvider value={contextValue}>
      <ReactAriaRadioGroup
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
      </ReactAriaRadioGroup>
    </RadioGroupProvider>
  );
};

RadioGroup.displayName = "DS_RadioGroup";
RadioGroup.Item = RadioGroupItem;

export type RadioGroupComponent = typeof RadioGroup & {
  Item: typeof RadioGroupItem;
};
