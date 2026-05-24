import type * as React from "react";
import type { RadioProps as ReactAriaRadioProps } from "react-aria-components";
import type { WithoutClassName } from "../../../../types/component-props";

export type RadioProps = WithoutClassName<Omit<ReactAriaRadioProps, "children">> & {
  label?: string;
  description?: string;
  children?: React.ReactNode;
  classNameOverrides?: Record<string, string[]>;
  size?: "sm" | "md" | "lg";
  hasError?: boolean;
};
