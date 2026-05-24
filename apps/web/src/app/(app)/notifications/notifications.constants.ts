import {
  ArrowsClockwiseIcon,
  AtIcon,
  CloudArrowUpIcon,
  UserPlusIcon,
  WarningIcon,
} from "@phosphor-icons/react";
import type {
  Notification,
  NotificationTypeStyle,
  NotifType,
  PreferenceOption,
  PrefKey,
} from "./notifications.types";

export const INITIAL_NOTIFICATIONS: Notification[] = [
  { id: "1", type: "mention", title: "Amara mentioned you", body: '"@james can you review the updated token spec?"', time: "2 min ago", read: false },
  { id: "2", type: "deploy", title: "Chromatic build passed", body: "All 47 stories captured with no visual regressions.", time: "18 min ago", read: false },
  { id: "3", type: "invite", title: "Team invite accepted", body: "Sofia Andersen joined the Design workspace.", time: "1 hr ago", read: false },
  { id: "4", type: "alert", title: "Storage 90% full", body: "You're using 4.5 GB of your 5 GB limit. Upgrade your plan.", time: "3 hr ago", read: false },
  { id: "5", type: "mention", title: "Carlos mentioned you", body: '"@james the button link variant looks great!"', time: "Yesterday", read: true },
  { id: "6", type: "update", title: "Jigsaw v2.1.0 released", body: "New: Select, NumberField, and Tooltip components added.", time: "Yesterday", read: true },
  { id: "7", type: "deploy", title: "Chromatic build failed", body: "3 stories changed unexpectedly. Review required.", time: "2 days ago", read: true },
  { id: "8", type: "invite", title: "New member joined", body: "Tom Nakamura joined the Design workspace.", time: "3 days ago", read: true },
];

export const TYPE_CONFIG: Record<NotifType, NotificationTypeStyle> = {
  mention: {
    bg: "bg-interactive-accent/10",
    dot: "bg-interactive-accent",
    icon: AtIcon,
    iconTone: "accent",
  },
  invite: {
    bg: "bg-feedback-success-subtle",
    dot: "bg-feedback-success",
    icon: UserPlusIcon,
    iconTone: "success",
  },
  update: {
    bg: "bg-surface-muted",
    dot: "bg-foreground-muted",
    icon: ArrowsClockwiseIcon,
    iconTone: "secondary",
  },
  alert: {
    bg: "bg-feedback-warning-subtle",
    dot: "bg-feedback-warning",
    icon: WarningIcon,
    iconTone: "warning",
    iconWeight: "fill",
  },
  deploy: {
    bg: "bg-surface-muted",
    dot: "bg-interactive-accent",
    icon: CloudArrowUpIcon,
    iconTone: "secondary",
  },
};

export const DEFAULT_PREFERENCES: Record<PrefKey, boolean> = {
  mentions: true,
  deploys: true,
  invites: true,
  updates: false,
  alerts: true,
};

export const PREFERENCE_OPTIONS: PreferenceOption[] = [
  { key: "mentions", label: "Mentions", desc: "When someone @mentions you." },
  { key: "deploys", label: "Deployments", desc: "Build and deploy status updates." },
  { key: "invites", label: "Team changes", desc: "Members joining or leaving workspaces." },
  { key: "updates", label: "Product updates", desc: "New features and release notes." },
  { key: "alerts", label: "Alerts", desc: "Storage, security, and billing warnings." },
];
