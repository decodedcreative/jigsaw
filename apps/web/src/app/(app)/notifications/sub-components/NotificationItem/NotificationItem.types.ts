import type { Notification } from "../../notifications.types";

export type NotificationItemProps = {
  notification: Notification;
  onMarkRead: (id: string) => void;
  onDismiss: (id: string) => void;
};
