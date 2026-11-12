"use client";

import { Form as ReactAriaForm } from "react-aria-components";
import { useGetClassNames, useRootClassName } from "@hooks";
import { FormGroup } from "./sub-components/FormGroup";
import { formStyles } from "./Form.styles";
import type { FormProps } from "./Form.types";

export const Form = ({
  children,
  classNameOverrides,
  className,
  labelPosition = "top",
  ...props
}: FormProps) => {
  const classNames = useGetClassNames(formStyles, classNameOverrides);
  const rootClassName = useRootClassName(classNames.component, className);
  return (
    <ReactAriaForm data-label-position={labelPosition} {...props} className={rootClassName}>
      {children}
    </ReactAriaForm>
  );
};

Form.displayName = "DS_Form";
Form.Group = FormGroup;

export type FormComponent = typeof Form & {
  Group: typeof FormGroup;
};
