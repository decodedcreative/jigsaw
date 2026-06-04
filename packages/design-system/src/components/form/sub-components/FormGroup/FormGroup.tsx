"use client";

import { useId } from "react";
import { Heading } from "@components/heading";
import { useGetClassNames } from "@hooks";
import { formGroupStyles } from "./FormGroup.styles";
import type { FormGroupProps } from "./FormGroup.types";

export const FormGroup = ({
  title,
  children,
  classNameOverrides,
  ...props
}: FormGroupProps) => {
  const titleId = useId();
  const { title: titleClassName, ...sectionClassNameOverrides } = classNameOverrides ?? {};
  const classNames = useGetClassNames(formGroupStyles, sectionClassNameOverrides, { section: {} });

  return (
    <section
      aria-labelledby={title ? titleId : undefined}
      className={classNames.section}
      {...props}
    >
      {title ? (
        <Heading
          id={titleId}
          as="h3"
          size="h4"
          classNameOverrides={
            titleClassName ? { component: titleClassName } : undefined
          }
        >
          {title}
        </Heading>
      ) : null}
      {children}
    </section>
  );
};

FormGroup.displayName = "Form.Group";
