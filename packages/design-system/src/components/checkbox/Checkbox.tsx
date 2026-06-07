"use client";

import { CheckIcon, MinusIcon } from "@phosphor-icons/react";
import {
  CheckboxField as ReactAriaCheckboxField,
  CheckboxButton as ReactAriaCheckboxButton,
} from "react-aria-components";
import { useGetClassNames, useRootClassName } from "@hooks";
import { Icon, type IconSize } from "@components/icon";
import { useCheckboxGroupContext } from "../checkbox-group/CheckboxGroupContext";
import { checkboxStyles } from "./Checkbox.styles";
import type { CheckboxProps, CheckboxSize } from "./Checkbox.types";

const checkboxIconSize: Record<CheckboxSize, IconSize> = {
  sm: "xs",
  md: "xs",
  lg: "md",
};

export const Checkbox = ({
  label,
  description,
  size = "md",
  hasError = false,
  classNameOverrides,
  className,
  children,
  isInvalid,
  ...props
}: CheckboxProps) => {
  const group = useCheckboxGroupContext();
  const resolvedHasError = hasError || group?.groupHasError || false;
  const state = resolvedHasError ? "error" : "default";

  const iconSize = checkboxIconSize[size];
  const classNames = useGetClassNames(checkboxStyles, classNameOverrides, {
    box: { size, state },
    label: { size },
    description: { size },
  });
  const rootClassName = useRootClassName(classNames.wrapper, className);

  return (
    <ReactAriaCheckboxField isInvalid={isInvalid || resolvedHasError} {...props}>
      <ReactAriaCheckboxButton className={rootClassName}>
        {({ isSelected, isIndeterminate }) => (
          <>
            <div className={classNames.box}>
              {isIndeterminate && !isSelected ? (
                <Icon icon={MinusIcon} size={iconSize} classNameOverrides={{ component: classNames.icon }} />
              ) : isSelected ? (
                <Icon icon={CheckIcon} size={iconSize} classNameOverrides={{ component: classNames.icon }} />
              ) : null}
            </div>
            {(label || children || description) && (
              <div className="flex flex-col">
                {(label || children) && (
                  <span className={classNames.label}>{label || children}</span>
                )}
                {description && <span className={classNames.description}>{description}</span>}
              </div>
            )}
          </>
        )}
      </ReactAriaCheckboxButton>
    </ReactAriaCheckboxField>
  );
};

Checkbox.displayName = "DS_Checkbox";
