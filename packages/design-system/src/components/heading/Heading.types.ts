import type { HTMLAttributes, ReactNode } from "react";
import type { ClassNameOverrides, WithoutClassName } from "@jsw-types/component-props";
import type { headingStyles } from "./Heading.styles";

export type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

/** Visual scale for heading typography. Defaults to match `as` when omitted. */
export type HeadingSize = HeadingLevel;

export type HeadingProps = Omit<WithoutClassName<HTMLAttributes<HTMLHeadingElement>>, "children"> & {
  /** Semantic heading element. */
  as?: HeadingLevel;
  children: ReactNode;
  classNameOverrides?: ClassNameOverrides<typeof headingStyles>;
  /**
   * Extra classes for the root element, merged last via `twMerge` (wins conflicts).
   * Intended for layout/positioning from the outside; use `classNameOverrides` for
   * internal slots.
   */
  className?: string;
  /** Muted foreground colour for supporting headings. */
  muted?: boolean;
  /** Visual size — use a different level than `as` when semantics and style should diverge. */
  size?: HeadingSize;
};

/** Props for H1–H6 aliases where the semantic element is fixed. */
export type HeadingAliasProps = Omit<HeadingProps, "as">;
