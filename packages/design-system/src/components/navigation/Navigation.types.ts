import type { HTMLAttributes, ReactNode } from "react";
import type { WithoutClassName } from "../../types/component-props";

export type NavigationProps = WithoutClassName<HTMLAttributes<HTMLElement>> & {
  brand?: ReactNode;
  links?: ReactNode;
  actions?: ReactNode;
  /** Controlled mobile menu open state */
  mobileOpen?: boolean;
  /** Initial mobile menu state when uncontrolled */
  defaultMobileOpen?: boolean;
  onMobileOpenChange?: (open: boolean) => void;
  classNameOverrides?: Record<string, string[]>;
};
