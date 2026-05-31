import {
  ArrowClockwiseIcon,
  AtIcon,
  UserPlusIcon,
  WarningIcon,
  type Icon as PhosphorIcon,
} from "@phosphor-icons/react";
import { Icon } from "@jigsaw/design-system";
import type { ReactNode } from "react";
import type { Notification, ToastExample } from "./Notifications.stories.types";

export const TOAST_EXAMPLES: ToastExample[] = [
  { label: "Success",     variant: "success", title: "Changes saved",       description: "Your settings have been updated successfully." },
  { label: "Error",       variant: "error",   title: "Something went wrong", description: "We couldn't process your request. Please try again." },
  { label: "Warning",     variant: "warning", title: "Storage almost full", description: "You're using 90% of your 5 GB limit." },
  { label: "Info",        variant: "info",    title: "Maintenance scheduled", description: "We'll be down for maintenance on Sunday at 2 AM UTC." },
  { label: "Title only",  variant: "default", title: "Copied to clipboard" },
  {
    label: "With action",
    variant: "default",
    title: "Message deleted",
    description: "The message was moved to trash.",
  },
];

export const FEED: Notification[] = [
  { id: "1", type: "mention", title: "Amara mentioned you",       body: "\"@james can you review the updated token spec?\"",          time: "2 min ago",  read: false },
  { id: "2", type: "invite",  title: "Team invite accepted",      body: "Lena Fischer joined the Design workspace.",                  time: "14 min ago", read: false },
  { id: "3", type: "alert",   title: "Storage 90% full",          body: "Upgrade your plan to avoid service interruption.",           time: "1 hr ago",   read: false },
  { id: "4", type: "update",  title: "Jigsaw v2.1.0 released",    body: "New: Select, NumberField, and Tooltip components.",          time: "3 hr ago",   read: true  },
  { id: "5", type: "mention", title: "Carlos mentioned you",      body: "\"@james the button link variant looks great!\"",           time: "Yesterday",  read: true  },
  { id: "6", type: "update",  title: "Chromatic build passed",    body: "All 42 stories captured with no visual regressions.",       time: "Yesterday",  read: true  },
];

const notificationTypeIcons: Record<Notification["type"], PhosphorIcon> = {
  mention: AtIcon,
  invite: UserPlusIcon,
  update: ArrowClockwiseIcon,
  alert: WarningIcon,
};

export const TYPE_ICON: Record<Notification["type"], ReactNode> = {
  mention: <Icon icon={notificationTypeIcons.mention} size="md" />,
  invite: <Icon icon={notificationTypeIcons.invite} size="md" />,
  update: <Icon icon={notificationTypeIcons.update} size="md" />,
  alert: <Icon icon={notificationTypeIcons.alert} size="md" />,
};

export const TYPE_COLOR: Record<Notification["type"], string> = {
  mention: "bg-interactive-accent/10 text-interactive-accent",
  invite:  "bg-state-success-bg text-state-success-text",
  update:  "bg-surface-muted text-foreground-secondary",
  alert:   "bg-state-warning-bg text-state-warning-text",
};
