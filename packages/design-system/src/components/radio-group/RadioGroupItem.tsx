"use client";

import {
  RadioField as ReactAriaRadioField,
  RadioButton as ReactAriaRadioButton,
} from "react-aria-components";
import { useGetClassNames } from "@hooks";
import { radioStyles } from "./RadioGroupItem.styles";
import type { RadioGroupItemProps } from "./RadioGroupItem.types";

export const RadioGroupItem = ({
  label,
  description,
  size = "md",
  hasError = false,
  value,
  children,
  itemClassNameOverrides,
  ...props
}: RadioGroupItemProps) => {
  const state = hasError ? "error" : "default";

  const classNames = useGetClassNames(radioStyles, itemClassNameOverrides, {
    circle: { size, state },
    dot: { size, state },
    label: { size },
    itemDescription: { size },
  });

  return (
    <ReactAriaRadioField value={value} {...props}>
      <ReactAriaRadioButton className={classNames.wrapper}>
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
