"use client";

import {
  UNSTABLE_Toast as ReactAriaToast,
  UNSTABLE_ToastContent as ReactAriaToastContent,
  Text as ReactAriaText,
} from "react-aria-components/Toast";
import { XIcon } from "@phosphor-icons/react";
import { Button } from "@components/button/Button";
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
          <Button
            variant="link"
            size="sm"
            onPress={action.onClick}
            classNameOverrides={{ component: classNames.action }}
          >
            {action.label}
          </Button>
        )}
      </ReactAriaToastContent>
      <Button
        slot="close"
        variant="ghost"
        size="sm"
        aria-label="Close"
        classNameOverrides={{ component: classNames.close }}
      >
        <Icon icon={XIcon} size="md" />
      </Button>
    </ReactAriaToast>
  );
};

ToastItem.displayName = "DS_ToastItem";
