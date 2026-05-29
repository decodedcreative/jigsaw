import * as React from "react";
import { useGetClassNames } from "@hooks";
import { textStyles } from "./Text.styles";
import type { ClassNameOverrides, WithoutClassName } from "../../types/component-props";

export type TextProps = WithoutClassName<
  Omit<React.HTMLAttributes<HTMLParagraphElement>, "children">
> & {
  as?: "p" | "span";
  children: React.ReactNode;
  classNameOverrides?: ClassNameOverrides<typeof textStyles>;
  muted?: boolean;
  size?: "xs" | "sm" | "base" | "lg";
  weight?: "normal" | "medium" | "semibold" | "bold";
};

export const Text = ({
  as: Component = "p",
  size = "base",
  weight = "normal",
  muted = false,
  classNameOverrides = undefined,
  children,
  ...props
}: TextProps) => {
  const classNames = useGetClassNames(
    textStyles,
    classNameOverrides ?? {},
    { component: { size, weight, muted } }
  );

  return (
    <Component className={classNames.component} {...props}>
      {children}
    </Component>
  );
}

Text.displayName = 'DS_Text';