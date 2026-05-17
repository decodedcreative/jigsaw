"use client";

import * as React from "react";
import {
  RadioGroup as AriaRadioGroup,
  Radio as AriaRadio,
  Label,
  Text,
  type RadioGroupProps as AriaRadioGroupProps,
  type RadioProps as AriaRadioProps,
} from "react-aria-components";
import { useGetClassNames } from "@hooks";
import { radioGroupStyles, radioStyles } from "./RadioGroup.styles";

export type RadioGroupProps = Omit<AriaRadioGroupProps, "children"> & {
  label?: string;
  description?: string;
  errorMessage?: string;
  children?: React.ReactNode;
  classNameOverrides?: Record<string, string[]>;
};

export const RadioGroup = ({
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
    <AriaRadioGroup
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
    </AriaRadioGroup>
  );
};

RadioGroup.displayName = "DS_RadioGroup";

export type RadioProps = Omit<AriaRadioProps, "children"> & {
  label?: string;
  description?: string;
  children?: React.ReactNode;
  classNameOverrides?: Record<string, string[]>;
  size?: "sm" | "md" | "lg";
  hasError?: boolean;
};

export const Radio = ({
  label,
  description,
  size = "md",
  hasError = false,
  classNameOverrides,
  children,
  ...props
}: RadioProps) => {
  const state = hasError ? "error" : "default";

  const classNames = useGetClassNames(radioStyles, classNameOverrides, {
    wrapper: {},
    circle: { size, state },
    dot: { size, state },
    label: { size },
    itemDescription: { size },
  });

  return (
    <AriaRadio className={classNames.wrapper} {...props}>
      <div className={classNames.circle}>
        <div className={classNames.dot} />
      </div>
      {(label || children || description) && (
        <div className="flex flex-col">
          {(label || children) && (
            <span className={classNames.label}>{label || children}</span>
          )}
          {description && <span className={classNames.itemDescription}>{description}</span>}
        </div>
      )}
    </AriaRadio>
  );
};

Radio.displayName = "DS_Radio";
