"use client";

import * as React from "react";
import {
  NumberField as ReactAriaNumberField,
  Label,
  Group,
  Input,
  Button,
  Text,
  type NumberFieldProps as ReactAriaNumberFieldProps,
} from "react-aria-components";
import { useGetClassNames } from "@hooks";
import { numberFieldStyles } from "./NumberField.styles";
import type { ClassNameOverrides, WithoutClassName } from "@jsw-types/component-props";

export type NumberFieldProps = Omit<ReactAriaNumberFieldProps, "children"> & {
  label?: string;
  description?: string;
  errorMessage?: string;
  classNameOverrides?: ClassNameOverrides<typeof numberFieldStyles>;
  size?: "sm" | "md" | "lg";
};

export const NumberField = ({
  label,
  description,
  errorMessage,
  size = "md",
  classNameOverrides,
  isDisabled,
  isInvalid,
  ...props
}: NumberFieldProps) => {
  const state = isDisabled ? "disabled" : isInvalid || errorMessage ? "error" : "default";

  const classNames = useGetClassNames(numberFieldStyles, classNameOverrides, {
    wrapper: {},
    label: { state },
    group: {},
    input: { size, state },
    stepButton: { size, state },
    description: { state },
  });

  const decrementClasses = numberFieldStyles.stepButton({ position: "decrement", size, state });
  const incrementClasses = numberFieldStyles.stepButton({ position: "increment", size, state });

  return (
    <ReactAriaNumberField
      className={classNames.wrapper}
      isDisabled={isDisabled}
      isInvalid={isInvalid || !!errorMessage}
      {...props}
    >
      {label && <Label className={classNames.label}>{label}</Label>}
      <Group className={classNames.group}>
        <Button slot="decrement" className={decrementClasses}>
          <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none">
            <path d="M3 8H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </Button>
        <Input className={classNames.input} />
        <Button slot="increment" className={incrementClasses}>
          <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none">
            <path
              d="M8 3V13M3 8H13"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </Button>
      </Group>
      {(description || errorMessage) && (
        <Text
          slot={errorMessage ? "errorMessage" : "description"}
          className={classNames.description}
        >
          {errorMessage || description}
        </Text>
      )}
    </ReactAriaNumberField>
  );
};

NumberField.displayName = "DS_NumberField";
