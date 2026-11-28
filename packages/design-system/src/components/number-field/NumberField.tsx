"use client";

import { MinusIcon } from "@phosphor-icons/react/Minus";
import { PlusIcon } from "@phosphor-icons/react/Plus";
import {
  NumberField as ReactAriaNumberField,
  Label as ReactAriaLabel,
  Group as ReactAriaGroup,
  Input as ReactAriaInput,
  Button as ReactAriaButton,
  Text as ReactAriaText,
} from "react-aria-components";
import { usePartProps, useRootClassName, useAccessibleNameWarning } from "@hooks";
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
  ref,
  ...props
}: NumberFieldProps) => {
  const nameRef = useAccessibleNameWarning("NumberField", ref, { target: "input" });
  const state = isDisabled ? "disabled" : isInvalid || errorMessage ? "error" : "default";

  const parts = usePartProps("number-field", numberFieldStyles, classNameOverrides, {
    label: { state },
    group: { state },
    input: { size, state },
    decrementButton: { size, state },
    incrementButton: { size, state },
    description: { state },
  });
  const rootClassName = useRootClassName(parts.component.className, className);

  return (
    <ReactAriaNumberField
      isDisabled={isDisabled}
      isInvalid={isInvalid || !!errorMessage}
      {...props}
      {...parts.component}
      className={rootClassName}
      ref={nameRef}
    >
      {label && <ReactAriaLabel {...parts.label}>{label}</ReactAriaLabel>}
      <div {...parts.fieldBody}>
        <ReactAriaGroup {...parts.group}>
          <ReactAriaButton slot="decrement" {...parts.decrementButton}>
            <Icon icon={MinusIcon} size={size} />
          </ReactAriaButton>
          <ReactAriaInput {...parts.input} />
          <ReactAriaButton slot="increment" {...parts.incrementButton}>
            <Icon icon={PlusIcon} size={size} />
          </ReactAriaButton>
        </ReactAriaGroup>
        {(description || errorMessage) && (
          <ReactAriaText
            slot={errorMessage ? "errorMessage" : "description"}
            {...parts.description}
          >
            {errorMessage || description}
          </ReactAriaText>
        )}
      </div>
    </ReactAriaNumberField>
  );
};

NumberField.displayName = "DS_NumberField";
