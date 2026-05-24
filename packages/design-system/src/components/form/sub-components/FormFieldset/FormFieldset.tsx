"use client";

import { useId, type FC } from "react";
import { Heading } from "@components/heading";
import { useGetClassNames } from "@hooks";
import { formFieldsetStyles } from "./FormFieldset.styles";
import type { FormFieldsetProps } from "./FormFieldset.types";

export const FormFieldset: FC<FormFieldsetProps> = ({
  label,
  children,
  classNameOverrides,
  ...props
}: FormFieldsetProps) => {
  const labelId = useId();
  const classNames = useGetClassNames(formFieldsetStyles, classNameOverrides);

  return (
    <div
      role="group"
      aria-labelledby={label ? labelId : undefined}
      className={classNames.group}
      {...props}
    >
      {label && (
        <Heading
          id={labelId}
          as="h3"
          size="h4"
          classNameOverrides={
            classNameOverrides?.label ? { component: classNameOverrides.label } : undefined
          }
        >
          {label}
        </Heading>
      )}
      {children}
    </div>
  );
};

FormFieldset.displayName = "DS_FormFieldset";
