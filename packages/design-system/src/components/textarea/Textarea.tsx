"use client";

import {
  TextField as ReactAriaTextField,
  Label as ReactAriaLabel,
  TextArea as ReactAriaTextArea,
  Text as ReactAriaText,
} from "react-aria-components";
import { usePartProps, useRootClassName, useAccessibleNameWarning } from "@hooks";
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
  ref,
  ...props
}: TextareaProps) => {
  const nameRef = useAccessibleNameWarning("Textarea", ref, { target: "textarea" });
  const state = isDisabled ? "disabled" : isInvalid || errorMessage ? "error" : "default";

  const parts = usePartProps("textarea", textareaStyles, classNameOverrides, {
    label: { state },
    textarea: { size, state },
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
        <ReactAriaTextArea {...parts.textarea} placeholder={placeholder} rows={rows} />
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

Textarea.displayName = "DS_Textarea";
