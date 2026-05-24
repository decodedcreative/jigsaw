"use client";

import { XIcon } from "@phosphor-icons/react";
import { Icon, useToast } from "@jigsaw/design-system";
import { TYPE_CONFIG } from "../../notifications.constants";
import type { NotificationItemProps } from "./NotificationItem.types";

export function NotificationItem({ notification, onMarkRead, onDismiss }: NotificationItemProps) {
  const { addToast } = useToast();
  const cfg = TYPE_CONFIG[notification.type];

  return (
    <div
      className={`flex items-start gap-3 px-4 py-4 transition-colors ${!notification.read ? "bg-interactive-accent/5" : ""}`}
    >
      <div className="mt-1.5 w-2 shrink-0">
        {!notification.read && <div className={`w-2 h-2 rounded-full ${cfg.dot}`} />}
      </div>

      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${cfg.bg}`}>
        <Icon icon={cfg.icon} tone={cfg.iconTone} weight={cfg.iconWeight} />
      </div>

      <button className="flex-1 min-w-0 text-left" onClick={() => onMarkRead(notification.id)}>
        <p
          className={`text-sm leading-snug ${notification.read ? "text-foreground-secondary" : "font-medium text-foreground-primary"}`}
        >
          {notification.title}
        </p>
        <p className="text-xs text-foreground-secondary mt-0.5 leading-relaxed">{notification.body}</p>
        <p className="text-xs text-foreground-muted mt-1">{notification.time}</p>
      </button>

      <button
        className="shrink-0 p-1 rounded text-foreground-muted hover:text-foreground-primary hover:bg-surface-hover transition-colors"
        onClick={() => {
          onDismiss(notification.id);
          addToast({ title: "Notification dismissed", variant: "default" });
        }}
        aria-label="Dismiss"
      >
        <Icon icon={XIcon} size="sm" />
      </button>
    </div>
  );
}
