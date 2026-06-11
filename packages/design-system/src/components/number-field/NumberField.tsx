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
import { useGetClassNames, useRootClassName } from "@hooks";
import { Icon } from "@components/icon";
import { numberFieldStyles } from "./NumberField.styles";
import type { NumberFieldProps } from "./NumberField.types";

export const NumberField = ({
  label,
  description,
  errorMessage,
  size = "md",
  classNameOverrides,
  className,
  isDisabled,
  isInvalid,
  ...props
}: NumberFieldProps) => {
  const state = isDisabled ? "disabled" : isInvalid || errorMessage ? "error" : "default";

  const classNames = useGetClassNames(numberFieldStyles, classNameOverrides, {
    label: { state },
    group: { size, state },
    inputCell: { state },
    input: { size, state },
    decrementButton: { size, state },
    incrementButton: { size, state },
    description: { state },
  });
  const rootClassName = useRootClassName(classNames.wrapper, className);

  return (
    <ReactAriaNumberField
      className={rootClassName}
      isDisabled={isDisabled}
      isInvalid={isInvalid || !!errorMessage}
      {...props}
    >
      {label && <ReactAriaLabel className={classNames.label}>{label}</ReactAriaLabel>}
      <div className={classNames.fieldBody}>
        <ReactAriaGroup className={classNames.group}>
          <ReactAriaButton slot="decrement" className={classNames.decrementButton}>
            <Icon icon={MinusIcon} size={size} />
          </ReactAriaButton>
          <div className={classNames.inputCell}>
            <ReactAriaInput className={classNames.input} />
          </div>
          <ReactAriaButton slot="increment" className={classNames.incrementButton}>
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
