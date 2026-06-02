"use client";

import type { FC } from "react";
import { XIcon } from "@phosphor-icons/react";
import { Icon } from "@components/icon";
import { twMerge } from "tailwind-merge";
import { useGetClassNames, useThemeProvider } from "@hooks";
import type { ToastItemProps } from "../../Toast.types";
import { toastItemStyles } from "./ToastItem.styles";
import { toastVariantIcons } from "./ToastItem.icons";

export const ToastItem: FC<ToastItemProps> = ({
  id,
  title,
  description,
  variant = "default",
  icon,
  action,
  onClose,
  className,
  classNameOverrides,
}) => {
  const theme = useThemeProvider();
  const twMergeFn = theme?.twMerge ?? twMerge;

  const classNames = useGetClassNames(toastItemStyles, classNameOverrides, {
    component: { variant },
    icon: { variant },
  });

  const statusIcon = icon ?? toastVariantIcons[variant];

  return (
    <div
      className={twMergeFn(classNames.component, className)}
      role="alert"
      data-toast-id={id}
    >
      <span className={classNames.icon} data-testid="toast-status-icon">
        <Icon icon={statusIcon} size="lg" weight="fill" />
      </span>
      <div className={classNames.content}>
        {title && <div className={classNames.title}>{title}</div>}
        {description && <div className={classNames.description}>{description}</div>}
        {action && (
          <button type="button" className={classNames.action} onClick={action.onClick}>
            {action.label}
          </button>
        )}
      </div>
      <button type="button" className={classNames.close} onClick={onClose} aria-label="Close">
        <Icon icon={XIcon} size="md" />
      </button>
    </div>
  );
};

ToastItem.displayName = "DS_ToastItem";
