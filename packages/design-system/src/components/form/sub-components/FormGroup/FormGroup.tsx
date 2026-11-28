"use client";

import { useId } from "react";
import { Heading } from "@components/heading";
import { usePartProps, useRootClassName } from "@hooks";
import { formGroupStyles } from "./FormGroup.styles";
import type { FormGroupProps } from "./FormGroup.types";

export const FormGroup = ({
  title,
  titleAs = "h3",
  children,
  classNameOverrides,
  className,
  ...props
}: FormGroupProps) => {
  const titleId = useId();
  const { title: titleClassName, ...sectionClassNameOverrides } = classNameOverrides ?? {};
  const parts = usePartProps("form-group", formGroupStyles, sectionClassNameOverrides);
  const rootClassName = useRootClassName(parts.component.className, className);

  const headingClassName = [parts.title.className, titleClassName].filter(Boolean).join(" ");

  return (
    <section
      aria-labelledby={title ? titleId : undefined}
      {...props}
      {...parts.component}
      className={rootClassName}
    >
      {title ? (
        <Heading
          id={titleId}
          as={titleAs}
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
