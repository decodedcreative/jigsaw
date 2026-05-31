"use client";

import * as React from "react";
import {
  TextField,
  Label,
  Input as ReactAriaInput,
  Text,
  type TextFieldProps,
} from "react-aria-components";
import { useGetClassNames } from "@hooks";
import { inputStyles } from "./Input.styles";
import type { ClassNameOverrides, WithoutClassName } from "@jsw-types/component-props";

export type InputProps = Omit<TextFieldProps, "children"> & {
  label?: string;
  description?: string;
  errorMessage?: string;
  placeholder?: string;
  classNameOverrides?: ClassNameOverrides<typeof inputStyles>;
  size?: "sm" | "md" | "lg";
};

export const Input = ({
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
    <TextField
      className={classNames.wrapper}
      isDisabled={isDisabled}
      isInvalid={isInvalid || !!errorMessage}
      {...props}
    >
      {label && <Label className={classNames.label}>{label}</Label>}
      <ReactAriaInput className={classNames.input} placeholder={placeholder} />
      {(description || errorMessage) && (
        <Text slot={errorMessage ? "errorMessage" : "description"} className={classNames.description}>
          {errorMessage || description}
        </Text>
      )}
    </TextField>
  );
};

Input.displayName = "DS_Input";
