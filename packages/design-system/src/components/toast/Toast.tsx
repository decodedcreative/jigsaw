"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
  type HTMLAttributes,
} from "react";
import { useGetClassNames } from "@hooks";
import { toastStyles, type ToastVariant, type ToastPosition } from "./Toast.styles";
import type { ClassNameOverrides, WithoutClassName } from "@ds-types/component-props";

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

interface ToastContextValue {
  toasts: ToastData[];
  addToast: (toast: Omit<ToastData, "id">) => string;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}

export type ToastProviderProps = {
  children: ReactNode;
  position?: ToastPosition;
  classNameOverrides?: ClassNameOverrides<typeof toastStyles>;
};

export function ToastProvider({
  children,
  position = "bottom-right",
  classNameOverrides,
}: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastData[]>([]);
  const classNames = useGetClassNames(toastStyles, classNameOverrides, {
    viewport: { position },
  });

  const addToast = useCallback((toast: Omit<ToastData, "id">) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { ...toast, id }]);
    if (toast.duration !== 0) {
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, toast.duration || 5000);
    }
    return id;
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <div className={classNames.viewport}>
        {toasts.map((toast) => (
          <ToastItem
            key={toast.id}
            {...toast}
            onClose={() => removeToast(toast.id)}
            classNameOverrides={classNameOverrides}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export type ToastItemProps = ToastData & {
  onClose: () => void;
  classNameOverrides?: ClassNameOverrides<typeof toastStyles>;
};

export function ToastItem({
  title,
  description,
  variant = "default",
  action,
  onClose,
  classNameOverrides,
}: ToastItemProps) {
  const classNames = useGetClassNames(toastStyles, classNameOverrides, {
    component: { variant },
    icon: { variant },
    content: {},
    title: {},
    description: {},
    close: {},
    action: {},
  });

  return (
    <div className={classNames.component} role="alert">
      <span className={classNames.icon}>
        <ToastIcon variant={variant} />
      </span>
      <div className={classNames.content}>
        {title && <div className={classNames.title}>{title}</div>}
        {description && <div className={classNames.description}>{description}</div>}
        {action && (
          <button className={classNames.action} onClick={action.onClick}>
            {action.label}
          </button>
        )}
      </div>
      <button className={classNames.close} onClick={onClose} aria-label="Close">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 6 6 18" />
          <path d="m6 6 12 12" />
        </svg>
      </button>
    </div>
  );
}

function ToastIcon({ variant }: { variant: ToastVariant }) {
  const icons: Record<ToastVariant, ReactNode> = {
    default: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" />
      </svg>
    ),
    success: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><path d="m9 12 2 2 4-4" />
      </svg>
    ),
    warning: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" />
        <path d="M12 9v4" /><path d="M12 17h.01" />
      </svg>
    ),
    error: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><path d="m15 9-6 6" /><path d="m9 9 6 6" />
      </svg>
    ),
    info: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" />
      </svg>
    ),
  };
  return <>{icons[variant]}</>;
}
