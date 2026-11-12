"use client";

import { useId } from "react";
import { Heading } from "@components/heading";
import { useGetClassNames, useRootClassName } from "@hooks";
import { formGroupStyles } from "./FormGroup.styles";
import type { FormGroupProps } from "./FormGroup.types";

export const FormGroup = ({
  title,
  children,
  classNameOverrides,
  className,
  ...props
}: FormGroupProps) => {
  const titleId = useId();
  const { title: titleClassName, ...sectionClassNameOverrides } = classNameOverrides ?? {};
  const classNames = useGetClassNames(formGroupStyles, sectionClassNameOverrides);
  const rootClassName = useRootClassName(classNames.component, className);

  const headingClassName = [classNames.title, titleClassName].filter(Boolean).join(" ");

  return (
    <section
      aria-labelledby={title ? titleId : undefined}
      {...props}
      className={rootClassName}
    >
      {title ? (
        <Heading
          id={titleId}
          as="h3"
          size="h4"
          classNameOverrides={
            headingClassName ? { component: headingClassName } : undefined
          }
        >
          {title}
        </Heading>
      ) : null}
      {children}
    </section>
  );
};

FormGroup.displayName = "DS_Form.Group";
