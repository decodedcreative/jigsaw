"use client";

import { XIcon } from "@phosphor-icons/react/X";
import {
  UNSTABLE_Toast as ReactAriaToast,
  UNSTABLE_ToastContent as ReactAriaToastContent,
  Text as ReactAriaText,
} from "react-aria-components/Toast";
import { Button } from "@components/button/Button";
import { Icon } from "@components/icon";
import { usePartProps, useRootClassName } from "@hooks";
import type { ToastItemProps } from "./ToastItem.types";
import { toastItemStyles } from "./ToastItem.styles";
import { toastVariantIcons } from "./ToastItem.icons";

export const ToastItem = ({ toast, classNameOverrides }: ToastItemProps) => {
  const { title, description, variant = "default", icon, action, className } = toast.content;

  const parts = usePartProps(
    "toast-item",
    toastItemStyles,
    classNameOverrides,
    {
      component: { variant },
      icon: { variant },
    }
  );
  const rootClassName = useRootClassName(parts.component.className, className);

  const statusIcon = icon ?? toastVariantIcons[variant];

  return (
    <ReactAriaToast
      toast={toast}
      {...parts.component}
      className={rootClassName}
      data-toast-id={toast.key}
    >
      <span {...parts.icon} data-testid="toast-status-icon">
        <Icon icon={statusIcon} size="lg" weight="fill" />
      </span>
      <ReactAriaToastContent {...parts.content}>
        {title && (
          <ReactAriaText slot="title" {...parts.title}>
            {title}
          </ReactAriaText>
        )}
        {description && (
          <ReactAriaText slot="description" {...parts.description}>
            {description}
          </ReactAriaText>
        )}
        {action && (
          <Button
            variant="link"
            size="sm"
            onPress={action.onClick}
            classNameOverrides={{ component: parts.action.className }}
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
        classNameOverrides={{ component: parts.close.className }}
      >
        <Icon icon={XIcon} size="md" />
      </Button>
    </ReactAriaToast>
  );
};

ToastItem.displayName = "DS_ToastItem";
