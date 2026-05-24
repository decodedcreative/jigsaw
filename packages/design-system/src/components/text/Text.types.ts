import type * as React from "react";
import type { WithoutClassName } from "../../types/component-props";

export type TextProps = Omit<WithoutClassName<React.HTMLAttributes<HTMLParagraphElement>>, "children"> & {
  as?: "p" | "span";
  children: React.ReactNode;
  classNameOverrides?: Record<string, string[]>;
  muted?: boolean;
  size?: "xs" | "sm" | "base" | "lg";
  weight?: "normal" | "medium" | "semibold" | "bold";
};

/** Shared props for named typography presets (Subheading, Notice, etc.). */
export type TextAliasProps = Omit<WithoutClassName<React.HTMLAttributes<HTMLParagraphElement>>, "children"> & {
  as?: "p" | "span";
  children: React.ReactNode;
  classNameOverrides?: Record<string, string[]>;
};
