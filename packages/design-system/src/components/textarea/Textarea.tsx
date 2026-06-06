"use client";

import {
  TextField as ReactAriaTextField,
  Label as ReactAriaLabel,
  TextArea as ReactAriaTextArea,
  Text as ReactAriaText,
} from "react-aria-components";
import { useGetClassNames, useRootClassName } from "@hooks";
import { textareaStyles } from "./Textarea.styles";
import type { TextareaProps } from "./Textarea.types";

export const Textarea = ({
  label,
  description,
  errorMessage,
  placeholder,
  rows = 4,
  size = "md",
  classNameOverrides,
  className,
  isDisabled,
  isInvalid,
  ...props
}: TextareaProps) => {
  const state = isDisabled ? "disabled" : isInvalid || errorMessage ? "error" : "default";

  const classNames = useGetClassNames(textareaStyles, classNameOverrides, {
    label: { state },
    textarea: { size, state },
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
        <ReactAriaTextArea className={classNames.textarea} placeholder={placeholder} rows={rows} />
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

Textarea.displayName = "DS_Textarea";
