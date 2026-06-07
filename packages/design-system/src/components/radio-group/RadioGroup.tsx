"use client";

import {
  RadioGroup as ReactAriaRadioGroup,
  Label as ReactAriaLabel,
  Text as ReactAriaText,
} from "react-aria-components";
import { useGetClassNames, useRootClassName } from "@hooks";
import { applyItemClassNameOverrides } from "@utils";
import { radioGroupStyles } from "./RadioGroup.styles";
import { RadioGroupItem } from "./RadioGroupItem";
import type { RadioGroupProps } from "./RadioGroup.types";

export const RadioGroup = ({
  label,
  description,
  errorMessage,
  children,
  classNameOverrides,
  className,
  isDisabled,
  isInvalid,
  ...props
}: RadioGroupProps) => {
  const state = isDisabled ? "disabled" : isInvalid || errorMessage ? "error" : "default";
  const { item: itemClassNameOverrides, ...groupClassNameOverrides } = classNameOverrides ?? {};

  const classNames = useGetClassNames(radioGroupStyles, groupClassNameOverrides, {
    label: { state },
  });
  const rootClassName = useRootClassName(classNames.group, className);

  return (
    <ReactAriaRadioGroup
      className={rootClassName}
      isDisabled={isDisabled}
      isInvalid={isInvalid || !!errorMessage}
      {...props}
    >
      {label && <ReactAriaLabel className={classNames.label}>{label}</ReactAriaLabel>}
      <div className={classNames.fieldBody}>
        {description && (
          <ReactAriaText slot="description" className={classNames.description}>
            {description}
          </ReactAriaText>
        )}
        <div className={classNames.options}>
          {applyItemClassNameOverrides(children, RadioGroupItem, itemClassNameOverrides)}
        </div>
        {errorMessage && (
          <ReactAriaText slot="errorMessage" className={classNames.errorMessage}>
            {errorMessage}
          </ReactAriaText>
        )}
      </div>
    </ReactAriaRadioGroup>
  );
};

RadioGroup.displayName = "DS_RadioGroup";
RadioGroup.Item = RadioGroupItem;

export type RadioGroupComponent = typeof RadioGroup & {
  Item: typeof RadioGroupItem;
};
