"use client";

import {
  TextField as ReactAriaTextField,
  Label as ReactAriaLabel,
  Input as ReactAriaInput,
  Text as ReactAriaText,
} from "react-aria-components";
import { usePartProps, useRootClassName, useAccessibleNameWarning } from "@hooks";
import { inputStyles } from "./Input.styles";
import type { InputProps } from "./Input.types";

export const Input = ({
  label,
  description,
  errorMessage,
  placeholder,
  size = "md",
  classNameOverrides,
  className,
  isDisabled,
  isInvalid,
  ref,
  ...props
}: InputProps) => {
  const nameRef = useAccessibleNameWarning("Input", ref, { target: "input" });
  const state = isDisabled ? "disabled" : isInvalid || errorMessage ? "error" : "default";

  const parts = usePartProps("input", inputStyles, classNameOverrides, {
    label: { state },
    input: { size, state },
    description: { state },
  });
  const rootClassName = useRootClassName(parts.component.className, className);

  return (
    <ReactAriaTextField
      {...parts.component}
      className={rootClassName}
      isDisabled={isDisabled}
      isInvalid={isInvalid || !!errorMessage}
      {...props}
      ref={nameRef}
    >
      {label && <ReactAriaLabel {...parts.label}>{label}</ReactAriaLabel>}
      <div {...parts.fieldBody}>
        <ReactAriaInput {...parts.input} placeholder={placeholder} />
        {(description || errorMessage) && (
          <ReactAriaText
            slot={errorMessage ? "errorMessage" : "description"}
            {...parts.description}
          >
            {errorMessage || description}
          </ReactAriaText>
        )}
      </div>
    </ReactAriaTextField>
  );
};

Input.displayName = "DS_Input";
