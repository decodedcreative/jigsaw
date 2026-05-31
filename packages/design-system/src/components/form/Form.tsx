"use client";

import * as React from "react";
import {
  Form as ReactAriaForm,
  type FormProps as ReactAriaFormProps,
} from "react-aria-components";
import { useGetClassNames } from "@hooks";
import { formStyles } from "./Form.styles";
import type { ClassNameOverrides, WithoutClassName } from "@jsw-types/component-props";

export type FormProps = ReactAriaFormProps & {
  classNameOverrides?: ClassNameOverrides<typeof formStyles>;
};

export const Form = ({ children, classNameOverrides, ...props }: FormProps) => {
  const classNames = useGetClassNames(formStyles, classNameOverrides, { form: {} });
  return (
    <ReactAriaForm className={classNames.form} {...props}>
      {children}
    </ReactAriaForm>
  );
};

Form.displayName = "DS_Form";

export type FormFieldsetProps = {
  legend?: string;
  children?: React.ReactNode;
  classNameOverrides?: ClassNameOverrides<typeof formStyles>;
};

export const FormFieldset = ({ legend, children, classNameOverrides }: FormFieldsetProps) => {
  const classNames = useGetClassNames(formStyles, classNameOverrides, {
    fieldset: {},
    legend: {},
    fields: {},
  });

  return (
    <fieldset className={classNames.fieldset}>
      {legend && <legend className={classNames.legend}>{legend}</legend>}
      <div className={classNames.fields}>{children}</div>
    </fieldset>
  );
};

FormFieldset.displayName = "DS_FormFieldset";

export type FormActionsProps = {
  children?: React.ReactNode;
  classNameOverrides?: ClassNameOverrides<typeof formStyles>;
};

export const FormActions = ({ children, classNameOverrides }: FormActionsProps) => {
  const classNames = useGetClassNames(formStyles, classNameOverrides, { actions: {} });
  return <div className={classNames.actions}>{children}</div>;
};

FormActions.displayName = "DS_FormActions";
