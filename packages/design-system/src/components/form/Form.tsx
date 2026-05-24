"use client";

import type { FC } from "react";
import { Form as ReactAriaForm } from "react-aria-components";
import { useGetClassNames } from "@hooks";
import { formStyles } from "./Form.styles";
import type { FormProps } from "./Form.types";

export const Form: FC<FormProps> = ({ children, classNameOverrides, ...props }: FormProps) => {
  const classNames = useGetClassNames(formStyles, classNameOverrides);
  return (
    <ReactAriaForm className={classNames.form} {...props}>
      {children}
    </ReactAriaForm>
  );
};

Form.displayName = "DS_Form";
