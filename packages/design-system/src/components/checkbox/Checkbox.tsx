"use client";

import type { FC } from "react";
import { CheckIcon, MinusIcon } from "@phosphor-icons/react";
import { Icon } from "@components/icon";
import { Checkbox as ReactAriaCheckbox } from "react-aria-components";
import { useGetClassNames } from "@hooks";
import { checkboxStyles } from "./Checkbox.styles";
import type { CheckboxProps } from "./Checkbox.types";

export const Checkbox: FC<CheckboxProps> = ({
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
        <Icon icon={CheckIcon} classNameOverrides={{ component: [classNames.checkmark] }} />
        <Icon icon={MinusIcon} classNameOverrides={{ component: [classNames.indeterminateMark] }} />
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
