import type { ReactNode } from "react";

/** Shared form action row for Account Settings examples (app-layer layout, not a DS component). */
export const formFooterClassName =
  "flex items-center gap-3 mt-6 pt-6 border-t border-border-default";

export const FormFooter = ({ children }: { children: ReactNode }) => (
  <div className={formFooterClassName}>{children}</div>
);
