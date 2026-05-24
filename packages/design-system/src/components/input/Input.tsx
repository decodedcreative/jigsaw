"use client";

import type { FC } from "react";
import {
  TextField as ReactAriaTextField,
  Label as ReactAriaLabel,
  Input as ReactAriaInput,
  Text as ReactAriaText,
} from "react-aria-components";
import { useGetClassNames } from "@hooks";
import { inputStyles } from "./Input.styles";
import type { InputProps } from "./Input.types";

export const Input: FC<InputProps> = ({
  label,
  description,
  errorMessage,
  placeholder,
  size = "md",
  classNameOverrides,
  isDisabled,
  isInvalid,
  ...props
}: InputProps) => {
  const state = isDisabled ? "disabled" : isInvalid || errorMessage ? "error" : "default";

  const classNames = useGetClassNames(inputStyles, classNameOverrides, {
    wrapper: {},
    label: { state },
    input: { size, state },
    description: { state },
  });

  return (
    <ReactAriaTextField
      className={classNames.wrapper}
      isDisabled={isDisabled}
      isInvalid={isInvalid || !!errorMessage}
      {...props}
    >
      {label && <ReactAriaLabel className={classNames.label}>{label}</ReactAriaLabel>}
      <ReactAriaInput className={classNames.input} placeholder={placeholder} />
      {(description || errorMessage) && (
        <ReactAriaText slot={errorMessage ? "errorMessage" : "description"} className={classNames.description}>
          {errorMessage || description}
        </ReactAriaText>
      )}
    </ReactAriaTextField>
  );
};

Input.displayName = "DS_Input";
