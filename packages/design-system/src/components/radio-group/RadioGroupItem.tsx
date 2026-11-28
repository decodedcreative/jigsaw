"use client";

import {
  RadioField as ReactAriaRadioField,
  RadioButton as ReactAriaRadioButton,
} from "react-aria-components";
import { usePartProps, useRootClassName, useAccessibleNameWarning } from "@hooks";
import { useRadioGroupContext } from "./RadioGroupContext";
import { radioGroupItemStyles } from "./RadioGroupItem.styles";
import type { RadioItemProps } from "./RadioGroupItem.types";

export const RadioGroupItem = ({
  label,
  description,
  size = "md",
  hasError = false,
  value,
  children,
  className,
  ref,
  ...props
}: RadioItemProps) => {
  const nameRef = useAccessibleNameWarning("RadioGroup.Item", ref, { target: 'input[type="radio"]' });
  const group = useRadioGroupContext();
  const resolvedHasError = hasError || group?.groupHasError || false;
  const state = resolvedHasError ? "error" : "default";

  const parts = usePartProps("radio-group-item", radioGroupItemStyles, group?.itemClassNameOverrides, {
    circle: { size, state },
    dot: { size, state },
    label: { size },
    itemDescription: { size },
  });
  const rootClassName = useRootClassName(parts.component.className, className);

  return (
    <ReactAriaRadioField value={value} {...props} {...parts.component} className={rootClassName} ref={nameRef}>
      <ReactAriaRadioButton {...parts.button}>
        <div {...parts.circle}>
          <div {...parts.dot} />
        </div>
        {(label || children || description) && (
          <div className="flex flex-col">
            {(label || children) && (
              <span {...parts.label}>{label || children}</span>
            )}
            {description && <span {...parts.itemDescription}>{description}</span>}
          </div>
        )}
      </ReactAriaRadioButton>
    </ReactAriaRadioField>
  );
};

RadioGroupItem.displayName = "DS_RadioGroup.Item";
