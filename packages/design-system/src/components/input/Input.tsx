"use client";

import {
  TextField as ReactAriaTextField,
  Label as ReactAriaLabel,
  Input as ReactAriaInput,
  Text as ReactAriaText,
} from "react-aria-components";
import { useGetClassNames, useRootClassName } from "@hooks";
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
  ...props
}: InputProps) => {
  const state = isDisabled ? "disabled" : isInvalid || errorMessage ? "error" : "default";

  const classNames = useGetClassNames(inputStyles, classNameOverrides, {
    label: { state },
    input: { size, state },
    description: { state },
  });
  const rootClassName = useRootClassName(classNames.wrapper, className);

  return (
    <ReactAriaTextField
      className={rootClassName}
      isDisabled={isDisabled}
      isInvalid={isInvalid || !!errorMessage}
      {...props}
    >
      {label && <ReactAriaLabel className={classNames.label}>{label}</ReactAriaLabel>}
      <div className={classNames.fieldBody}>
        <ReactAriaInput className={classNames.input} placeholder={placeholder} />
        {(description || errorMessage) && (
          <ReactAriaText
            slot={errorMessage ? "errorMessage" : "description"}
            className={classNames.description}
          >
            {errorMessage || description}
          </ReactAriaText>
        )}
      </div>
    </ReactAriaTextField>
  );
};

Input.displayName = "DS_Input";
