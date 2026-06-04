"use client";

import { Form as ReactAriaForm } from "react-aria-components";
import { useGetClassNames } from "@hooks";
import { formStyles } from "./Form.styles";
import type { FormProps } from "./Form.types";

export const Form = ({ children, classNameOverrides, ...props }: FormProps) => {
  const classNames = useGetClassNames(formStyles, classNameOverrides, { form: {} });
  return (
    <ReactAriaForm className={classNames.form} {...props}>
      {children}
    </ReactAriaForm>
  );
};

Form.displayName = "DS_Form";
