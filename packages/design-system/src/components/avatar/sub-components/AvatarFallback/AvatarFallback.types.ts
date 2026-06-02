import type { HTMLAttributes } from "react";
import type { ClassNameOverrides, WithoutClassName } from "@jsw-types/component-props";
import type { avatarFallbackStyles } from "./AvatarFallback.styles";

export type AvatarFallbackProps = WithoutClassName<HTMLAttributes<HTMLSpanElement>> & {
  classNameOverrides?: ClassNameOverrides<typeof avatarFallbackStyles>;
};
