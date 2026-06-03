"use client";

import { Heading } from "./Heading";
import type { HeadingAliasProps, HeadingLevel } from "./Heading.types";

function headingAlias(level: HeadingLevel) {
  const Alias = (props: HeadingAliasProps) => <Heading as={level} {...props} />;
  Alias.displayName = `DS_${level.toUpperCase()}`;
  return Alias;
}

export const H1 = headingAlias("h1");
export const H2 = headingAlias("h2");
export const H3 = headingAlias("h3");
export const H4 = headingAlias("h4");
export const H5 = headingAlias("h5");
export const H6 = headingAlias("h6");
