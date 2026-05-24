import type { Icon } from "@phosphor-icons/react";

export type NotifType = "mention" | "invite" | "update" | "alert" | "deploy";

export type Notification = {
  id: string;
  type: NotifType;
  title: string;
  body: string;
  time: string;
  read: boolean;
};

export type PrefKey = "mentions" | "deploys" | "invites" | "updates" | "alerts";

export type NotificationTypeStyle = {
  bg: string;
  dot: string;
  icon: Icon;
  iconTone: "accent" | "success" | "secondary" | "warning";
  iconWeight?: "fill" | "regular";
};

export type PreferenceOption = {
  key: PrefKey;
  label: string;
  desc: string;
};
