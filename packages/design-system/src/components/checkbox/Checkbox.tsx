"use client";

import * as React from "react";
import {
  Checkbox as ReactAriaCheckbox,
  type CheckboxProps as ReactAriaCheckboxProps,
} from "react-aria-components";
import { useGetClassNames } from "@hooks";
import { checkboxStyles } from "./Checkbox.styles";
import type { ClassNameOverrides, WithoutClassName } from "@ds-types/component-props";

export type CheckboxProps = Omit<ReactAriaCheckboxProps, "children"> & {
  label?: string;
  description?: string;
  children?: React.ReactNode;
  classNameOverrides?: ClassNameOverrides<typeof checkboxStyles>;
  size?: "sm" | "md" | "lg";
  hasError?: boolean;
};

export const Checkbox = ({
  label,
  description,
  size = "md",
  hasError = false,
  classNameOverrides,
  children,
  ...props
}: CheckboxProps) => {
  const state = hasError ? "error" : "default";

  const classNames = useGetClassNames(checkboxStyles, classNameOverrides, {
    wrapper: {},
    box: { size, state },
    checkmark: { size },
    indeterminateMark: { size },
    label: { size },
    description: { size },
  });

  return (
    <ReactAriaCheckbox className={classNames.wrapper} {...props}>
      <div className={classNames.box}>
        <svg className={classNames.checkmark} viewBox="0 0 12 12" fill="none">
          <path
            d="M2 6L5 9L10 3"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <svg className={classNames.indeterminateMark} viewBox="0 0 12 12" fill="none">
          <path
            d="M3 6H9"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>
      {(label || children || description) && (
        <div className="flex flex-col">
          {(label || children) && (
            <span className={classNames.label}>{label || children}</span>
          )}
          {description && <span className={classNames.description}>{description}</span>}
        </div>
      )}
    </ReactAriaCheckbox>
  );
};

Checkbox.displayName = "DS_Checkbox";
