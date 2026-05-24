"use client";

import type { FC } from "react";
import {
  TextField as ReactAriaTextField,
  Label as ReactAriaLabel,
  TextArea as ReactAriaTextArea,
  Text as ReactAriaText,
} from "react-aria-components";
import { useGetClassNames } from "@hooks";
import { textareaStyles } from "./Textarea.styles";
import type { TextareaProps } from "./Textarea.types";

export const Textarea: FC<TextareaProps> = ({
  label,
  description,
  errorMessage,
  placeholder,
  rows = 4,
  size = "md",
  classNameOverrides,
  isDisabled,
  isInvalid,
  ...props
}: TextareaProps) => {
  const state = isDisabled ? "disabled" : isInvalid || errorMessage ? "error" : "default";

  const classNames = useGetClassNames(textareaStyles, classNameOverrides, {
    wrapper: {},
    label: { state },
    textarea: { size, state },
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
      <ReactAriaTextArea className={classNames.textarea} placeholder={placeholder} rows={rows} />
      {(description || errorMessage) && (
        <ReactAriaText
          slot={errorMessage ? "errorMessage" : "description"}
          className={classNames.description}
        >
          {errorMessage || description}
        </ReactAriaText>
      )}
    </ReactAriaTextField>
  );
};

Textarea.displayName = "DS_Textarea";
