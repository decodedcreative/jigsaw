"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
  type HTMLAttributes,
} from "react";
import {
  CheckCircleIcon,
  InfoIcon,
  WarningIcon,
  XCircleIcon,
  XIcon,
  type Icon as PhosphorIcon,
} from "@phosphor-icons/react";
import { useGetClassNames } from "@hooks";
import { Icon } from "@components/icon";
import { toastStyles, type ToastVariant, type ToastPosition } from "./Toast.styles";
import type { ClassNameOverrides } from "@jsw-types/component-props";

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
        <Icon icon={XIcon} size="md" />
      </button>
    </div>
  );
}

const toastVariantIcons: Record<ToastVariant, PhosphorIcon> = {
  default: InfoIcon,
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: XCircleIcon,
  info: InfoIcon,
};

function ToastIcon({ variant }: { variant: ToastVariant }) {
  return <Icon icon={toastVariantIcons[variant]} size="lg" />;
}
