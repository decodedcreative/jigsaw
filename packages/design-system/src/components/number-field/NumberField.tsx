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
import { MinusIcon, PlusIcon } from "@phosphor-icons/react";
import { useGetClassNames } from "@hooks";
import { Icon } from "@components/icon";
import { numberFieldStyles } from "./NumberField.styles";
import type { ClassNameOverrides } from "@jsw-types/component-props";

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
    label: { state },
    group: {},
    input: { size, state },
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
      <div className={classNames.fieldBody}>
        <Group className={classNames.group}>
          <Button slot="decrement" className={decrementClasses}>
            <Icon icon={MinusIcon} size={size} />
          </Button>
          <Input className={classNames.input} />
          <Button slot="increment" className={incrementClasses}>
            <Icon icon={PlusIcon} size={size} />
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
      </div>
    </ReactAriaNumberField>
  );
};

NumberField.displayName = "DS_NumberField";
