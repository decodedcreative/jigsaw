"use client";

import type { FC } from "react";
import { Heading } from "./Heading";
import type { HeadingAliasProps, HeadingLevel } from "./Heading.types";

const LEVELS = ["h1", "h2", "h3", "h4", "h5", "h6"] as const satisfies readonly HeadingLevel[];

type HeadingAliasName = Uppercase<HeadingLevel>;

function headingAlias(level: HeadingLevel): FC<HeadingAliasProps> {
  const Alias = (props: HeadingAliasProps) => <Heading as={level} {...props} />;
  Alias.displayName = `DS_${level.toUpperCase()}`;
  return Alias;
}

export const { H1, H2, H3, H4, H5, H6 } = Object.fromEntries(
  LEVELS.map((level) => [level.toUpperCase(), headingAlias(level)])
) as Record<HeadingAliasName, FC<HeadingAliasProps>>;
