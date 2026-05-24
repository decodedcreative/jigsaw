import type { ReactNode } from "react";
import type { ToastPosition, ToastVariant } from "./Toast.styles";

export interface ToastData {
  id: string;
  title?: string;
  description?: string;
  variant?: ToastVariant;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export type ToastProviderProps = {
  children: ReactNode;
  position?: ToastPosition;
  classNameOverrides?: Record<string, string[]>;
};

export type ToastItemProps = ToastData & {
  onClose: () => void;
  classNameOverrides?: Record<string, string[]>;
};

export type ToastContextValue = {
  toasts: ToastData[];
  addToast: (toast: Omit<ToastData, "id">) => string;
  removeToast: (id: string) => void;
};
