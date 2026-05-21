"use client";

import * as React from "react";
import {
  TextField,
  Label,
  TextArea as AriaTextArea,
  Text,
  type TextFieldProps,
} from "react-aria-components";
import { useGetClassNames } from "@hooks";
import { textareaStyles } from "./Textarea.styles";

export type TextareaProps = Omit<TextFieldProps, "children"> & {
  label?: string;
  description?: string;
  errorMessage?: string;
  placeholder?: string;
  rows?: number;
  classNameOverrides?: Record<string, string[]>;
  size?: "sm" | "md" | "lg";
};

export const Textarea = ({
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
    <TextField
      className={classNames.wrapper}
      isDisabled={isDisabled}
      isInvalid={isInvalid || !!errorMessage}
      {...props}
    >
      {label && <Label className={classNames.label}>{label}</Label>}
      <AriaTextArea className={classNames.textarea} placeholder={placeholder} rows={rows} />
      {(description || errorMessage) && (
        <Text
          slot={errorMessage ? "errorMessage" : "description"}
          className={classNames.description}
        >
          {errorMessage || description}
        </Text>
      )}
    </TextField>
  );
};

Textarea.displayName = "DS_Textarea";
