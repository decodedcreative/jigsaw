"use client";

import type { FC } from "react";
import { Radio as ReactAriaRadio } from "react-aria-components";
import { useGetClassNames } from "@hooks";
import { radioStyles } from "./Radio.styles";
import type { RadioProps } from "./Radio.types";

export const Radio: FC<RadioProps> = ({
  label,
  description,
  size = "md",
  hasError = false,
  classNameOverrides,
  children,
  ...props
}: RadioProps) => {
  const state = hasError ? "error" : "default";

  const classNames = useGetClassNames(radioStyles, classNameOverrides, {
    wrapper: {},
    circle: { size, state },
    dot: { size, state },
    label: { size },
    itemDescription: { size },
  });

  return (
    <ReactAriaRadio className={classNames.wrapper} {...props}>
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
    </ReactAriaRadio>
  );
};

Radio.displayName = "DS_Radio";
