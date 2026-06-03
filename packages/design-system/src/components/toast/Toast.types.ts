import type { Icon as PhosphorIcon } from "@phosphor-icons/react";
import type { ToastVariant } from "./sub-components/ToastItem/ToastItem.types";

export type { ToastVariant, ToastItemProps } from "./sub-components/ToastItem/ToastItem.types";
export { toastVariants } from "./sub-components/ToastItem/ToastItem.types";
export type { ToastPosition, ToastProviderProps } from "./sub-components/ToastProvider/ToastProvider.types";
export { toastPositions } from "./sub-components/ToastProvider/ToastProvider.types";

export interface ToastData {
  id: string;
  title?: string;
  description?: string;
  variant?: ToastVariant;
  duration?: number;
  /** Overrides the default icon for this variant. */
  icon?: PhosphorIcon;
  /** Merged onto the root `component` slot via `classNameOverrides` / `twMerge`. */
  className?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export type ToastContextValue = {
  toasts: ToastData[];
  addToast: (toast: Omit<ToastData, "id">) => string;
  removeToast: (id: string) => void;
};
