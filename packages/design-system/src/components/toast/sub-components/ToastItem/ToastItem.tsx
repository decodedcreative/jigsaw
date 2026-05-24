"use client";

import type { FC } from "react";
import { CheckCircleIcon, InfoIcon, WarningIcon, XIcon, XCircleIcon } from "@phosphor-icons/react";
import { Icon } from "@components/icon";
import { useGetClassNames } from "@hooks";
import type { ToastVariant } from "../../Toast.styles";
import type { ToastItemProps } from "../../Toast.types";
import { toastItemStyles } from "./ToastItem.styles";

function ToastVariantIcon({ variant }: { variant: ToastVariant }) {
  switch (variant) {
    case "success":
      return <Icon icon={CheckCircleIcon} size="lg" weight="fill" />;
    case "warning":
      return <Icon icon={WarningIcon} size="lg" weight="fill" />;
    case "error":
      return <Icon icon={XCircleIcon} size="lg" weight="fill" />;
    case "info":
    case "default":
    default:
      return <Icon icon={InfoIcon} size="lg" weight="fill" />;
  }
}

export const ToastItem: FC<ToastItemProps> = ({
  title,
  description,
  variant = "default",
  action,
  onClose,
  classNameOverrides,
}) => {
  const classNames = useGetClassNames(toastItemStyles, classNameOverrides, {
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
        <ToastVariantIcon variant={variant} />
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
        <Icon icon={XIcon} />
      </button>
    </div>
  );
};

ToastItem.displayName = "DS_ToastItem";
