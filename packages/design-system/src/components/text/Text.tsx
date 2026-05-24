import type { FC } from "react";
import { useGetClassNames } from "@hooks";
import { textStyles } from "./Text.styles";
import type { TextProps } from "./Text.types";

export const Text: FC<TextProps> = ({
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