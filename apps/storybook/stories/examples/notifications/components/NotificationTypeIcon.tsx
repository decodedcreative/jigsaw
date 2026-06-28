import { Icon } from "@jigsaw-ds/design-system";
import {
  ArrowClockwiseIcon,
  AtIcon,
  UserPlusIcon,
  WarningIcon,
  type Icon as PhosphorIcon,
} from "@phosphor-icons/react";
import type { Notification } from "../Notifications.stories.types";

const notificationTypeIcons: Record<Notification["type"], PhosphorIcon> = {
  mention: AtIcon,
  invite: UserPlusIcon,
  update: ArrowClockwiseIcon,
  alert: WarningIcon,
};

export function NotificationTypeIcon({ type }: { type: Notification["type"] }) {
  return <Icon icon={notificationTypeIcons[type]} size="md" />;
}
