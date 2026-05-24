"use client";

import type { FC } from "react";
import {
  RadioGroup as ReactAriaRadioGroup,
  Label as ReactAriaLabel,
  Text as ReactAriaText,
} from "react-aria-components";
import { useGetClassNames } from "@hooks";
import { radioGroupStyles } from "./RadioGroup.styles";
import type { RadioGroupProps } from "./RadioGroup.types";

export const RadioGroup: FC<RadioGroupProps> = ({
  label,
  description,
  errorMessage,
  children,
  classNameOverrides,
  isDisabled,
  isInvalid,
  ...props
}: RadioGroupProps) => {
  const state = isDisabled ? "disabled" : isInvalid || errorMessage ? "error" : "default";

  const classNames = useGetClassNames(radioGroupStyles, classNameOverrides, {
    group: {},
    label: { state },
    description: {},
    errorMessage: {},
    options: {},
  });

  return (
    <ReactAriaRadioGroup
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
    </ReactAriaRadioGroup>
  );
};

RadioGroup.displayName = "DS_RadioGroup";
