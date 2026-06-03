"use client";

import {
  UNSTABLE_Toast as ReactAriaToast,
  UNSTABLE_ToastContent as ReactAriaToastContent,
  Button as ReactAriaButton,
  Text as ReactAriaText,
} from "react-aria-components/Toast";
import { XIcon } from "@phosphor-icons/react";
import { Icon } from "@components/icon";
import { twMerge } from "tailwind-merge";
import { useGetClassNames, useThemeProvider } from "@hooks";
import type { ToastItemProps } from "./ToastItem.types";
import { toastItemStyles } from "./ToastItem.styles";
import { toastVariantIcons } from "./ToastItem.icons";

export const ToastItem = ({ toast, classNameOverrides }: ToastItemProps) => {
  const { title, description, variant = "default", icon, action, className } = toast.content;
  const theme = useThemeProvider();
  const twMergeFn = theme?.twMerge ?? twMerge;

  const classNames = useGetClassNames(
    toastItemStyles,
    {
      ...classNameOverrides,
      component: twMergeFn(classNameOverrides?.component, className),
    },
    {
      component: { variant },
      icon: { variant },
    }
  );

  const statusIcon = icon ?? toastVariantIcons[variant];

  return (
    <ReactAriaToast toast={toast} className={classNames.component} data-toast-id={toast.key}>
      <span className={classNames.icon} data-testid="toast-status-icon">
        <Icon icon={statusIcon} size="lg" weight="fill" />
      </span>
      <ReactAriaToastContent className={classNames.content}>
        {title && (
          <ReactAriaText slot="title" className={classNames.title}>
            {title}
          </ReactAriaText>
        )}
        {description && (
          <ReactAriaText slot="description" className={classNames.description}>
            {description}
          </ReactAriaText>
        )}
        {action && (
          <button type="button" className={classNames.action} onClick={action.onClick}>
            {action.label}
          </button>
        )}
      </ReactAriaToastContent>
      <ReactAriaButton slot="close" className={classNames.close}>
        <Icon icon={XIcon} size="md" />
      </ReactAriaButton>
    </ReactAriaToast>
  );
};

ToastItem.displayName = "DS_ToastItem";
