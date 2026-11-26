"use client";

import {
  RadioField as ReactAriaRadioField,
  RadioButton as ReactAriaRadioButton,
} from "react-aria-components";
import { useGetClassNames, useRootClassName, useAccessibleNameWarning } from "@hooks";
import { useRadioGroupContext } from "./RadioGroupContext";
import { radioStyles } from "./RadioGroupItem.styles";
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

  const classNames = useGetClassNames(radioStyles, group?.itemClassNameOverrides, {
    circle: { size, state },
    dot: { size, state },
    label: { size },
    itemDescription: { size },
  });
  const rootClassName = useRootClassName(classNames.component, className);

  return (
    <ReactAriaRadioField value={value} {...props} className={rootClassName} ref={nameRef}>
      <ReactAriaRadioButton className={classNames.button}>
        <div className={classNames.circle}>
          <div className={classNames.dot} />
        </div>
        {(label || children || description) && (
          <div className="flex flex-col">
            {(label || children) && (
              <span className={classNames.label}>{label || children}</span>
            )}
            {description && <span className={classNames.itemDescription}>{description}</span>}
          </div>
        )}
      </ReactAriaRadioButton>
    </ReactAriaRadioField>
  );
};

RadioGroupItem.displayName = "DS_RadioGroup.Item";
