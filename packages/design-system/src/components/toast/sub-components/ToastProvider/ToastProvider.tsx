"use client";

import { useState, useCallback, type FC } from "react";
import { useGetClassNames } from "@hooks";
import { ToastContext } from "../../Toast.context";
import type { ToastData } from "../../Toast.types";
import type { ToastProviderProps } from "./ToastProvider.types";
import { ToastItem } from "../ToastItem";
import { toastProviderStyles } from "./ToastProvider.styles";

export const ToastProvider: FC<ToastProviderProps> = ({
  children,
  position = "bottom-right",
  classNameOverrides,
}) => {
  const [toasts, setToasts] = useState<ToastData[]>([]);
  const classNames = useGetClassNames(toastProviderStyles, classNameOverrides, {
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
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

ToastProvider.displayName = "DS_ToastProvider";
