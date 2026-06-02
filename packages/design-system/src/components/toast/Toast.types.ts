import type { ReactNode } from "react";
import type { Icon as PhosphorIcon } from "@phosphor-icons/react";
import type { ClassNameOverrides } from "@jsw-types/component-props";
import type { ToastVariant } from "./sub-components/ToastItem/ToastItem.styles";
import type { ToastPosition } from "./sub-components/ToastProvider/ToastProvider.styles";
import type { toastProviderStyles } from "./sub-components/ToastProvider/ToastProvider.styles";
import type { toastItemStyles } from "./sub-components/ToastItem/ToastItem.styles";

export type { ToastVariant } from "./sub-components/ToastItem/ToastItem.styles";
export { toastVariants } from "./sub-components/ToastItem/ToastItem.styles";
export type { ToastPosition } from "./sub-components/ToastProvider/ToastProvider.styles";
export { toastPositions } from "./sub-components/ToastProvider/ToastProvider.styles";

export interface ToastData {
  id: string;
  title?: string;
  description?: string;
  variant?: ToastVariant;
  duration?: number;
  /** Overrides the default icon for this variant. */
  icon?: PhosphorIcon;
  /** Merged onto the root element with CVA classes via `twMerge`. */
  className?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export type ToastProviderProps = {
  children: ReactNode;
  position?: ToastPosition;
  classNameOverrides?: ClassNameOverrides<typeof toastProviderStyles>;
};

export type ToastItemProps = ToastData & {
  onClose: () => void;
  classNameOverrides?: ClassNameOverrides<typeof toastItemStyles>;
};

export type ToastContextValue = {
  toasts: ToastData[];
  addToast: (toast: Omit<ToastData, "id">) => string;
  removeToast: (id: string) => void;
};
