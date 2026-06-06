"use client";

import { MinusIcon, PlusIcon } from "@phosphor-icons/react";
import {
  NumberField as ReactAriaNumberField,
  Label as ReactAriaLabel,
  Group as ReactAriaGroup,
  Input as ReactAriaInput,
  Button as ReactAriaButton,
  Text as ReactAriaText,
} from "react-aria-components";
import { useGetClassNames } from "@hooks";
import { Icon } from "@components/icon";
import { numberFieldStyles } from "./NumberField.styles";
import type { NumberFieldProps } from "./NumberField.types";

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
      {label && <ReactAriaLabel className={classNames.label}>{label}</ReactAriaLabel>}
      <div className={classNames.fieldBody}>
        <ReactAriaGroup className={classNames.group}>
          <ReactAriaButton slot="decrement" className={decrementClasses}>
            <Icon icon={MinusIcon} size={size} />
          </ReactAriaButton>
          <ReactAriaInput className={classNames.input} />
          <ReactAriaButton slot="increment" className={incrementClasses}>
            <Icon icon={PlusIcon} size={size} />
          </ReactAriaButton>
        </ReactAriaGroup>
        {(description || errorMessage) && (
          <ReactAriaText
            slot={errorMessage ? "errorMessage" : "description"}
            className={classNames.description}
          >
            {errorMessage || description}
          </ReactAriaText>
        )}
      </div>
    </ReactAriaNumberField>
  );
};

NumberField.displayName = "DS_NumberField";
