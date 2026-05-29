import type { ReactNode } from "react";

/** A linkable card pointing at a docs or story page. */
export type SectionLink = {
  title: string;
  description: string;
  href: string;
  icon?: string;
};

/** A component entry rendered in the component gallery. */
export type ComponentSection = {
  title: string;
  description: string;
};

/** Map of component title → preview snapshot node. */
export type PreviewMap = Record<string, ReactNode>;
