"use client";

import { CheckIcon } from "@phosphor-icons/react/Check";
import { MinusIcon } from "@phosphor-icons/react/Minus";
import {
  CheckboxField as ReactAriaCheckboxField,
  CheckboxButton as ReactAriaCheckboxButton,
} from "react-aria-components";
import { usePartProps, useRootClassName, useAccessibleNameWarning } from "@hooks";
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
  ref,
  ...props
}: CheckboxProps) => {
  const nameRef = useAccessibleNameWarning("Checkbox", ref, { target: 'input[type="checkbox"]' });
  const group = useCheckboxGroupContext();
  const resolvedHasError = hasError || group?.groupHasError || false;
  const state = resolvedHasError ? "error" : "default";

  const iconSize = checkboxIconSize[size];
  const parts = usePartProps("checkbox", checkboxStyles, classNameOverrides, {
    box: { size, state },
    label: { size },
    description: { size },
  });
  const rootClassName = useRootClassName(parts.component.className, className);

  return (
    <ReactAriaCheckboxField isInvalid={isInvalid || resolvedHasError} {...props}>
      <ReactAriaCheckboxButton ref={nameRef} {...parts.component} className={rootClassName}>
        {({ isSelected, isIndeterminate }) => (
          <>
            <div {...parts.box}>
              {isIndeterminate && !isSelected ? (
                <Icon icon={MinusIcon} size={iconSize} classNameOverrides={{ component: parts.icon.className }} />
              ) : isSelected ? (
                <Icon icon={CheckIcon} size={iconSize} classNameOverrides={{ component: parts.icon.className }} />
              ) : null}
            </div>
            {(label || children || description) && (
              <div className="flex flex-col">
                {(label || children) && (
                  <span {...parts.label}>{label || children}</span>
                )}
                {description && <span {...parts.description}>{description}</span>}
              </div>
            )}
          </>
        )}
      </ReactAriaCheckboxButton>
    </ReactAriaCheckboxField>
  );
};

Checkbox.displayName = "DS_Checkbox";
