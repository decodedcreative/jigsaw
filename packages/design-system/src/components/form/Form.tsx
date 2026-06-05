"use client";

import { Form as ReactAriaForm } from "react-aria-components";
import { useGetClassNames } from "@hooks";
import { FormGroup } from "./sub-components/FormGroup";
import { formStyles } from "./Form.styles";
import type { FormProps } from "./Form.types";

export const Form = ({
  children,
  classNameOverrides,
  labelPosition = "top",
  ...props
}: FormProps) => {
  const classNames = useGetClassNames(formStyles, classNameOverrides);
  return (
    <ReactAriaForm className={classNames.form} data-label-position={labelPosition} {...props}>
      {children}
    </ReactAriaForm>
  );
};

Form.displayName = "DS_Form";
Form.Group = FormGroup;

export type FormComponent = typeof Form & {
  Group: typeof FormGroup;
};
