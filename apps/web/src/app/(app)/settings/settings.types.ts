export type SettingsTabId = "profile" | "notifications" | "appearance" | "danger";

export type SettingsTab = {
  id: SettingsTabId;
  label: string;
};

export type NotificationPrefKey = "digest" | "product" | "security" | "activity";

export type NotificationPrefs = Record<NotificationPrefKey, boolean>;

export type NotificationPrefOption = {
  key: NotificationPrefKey;
  label: string;
  desc: string;
};

export type SelectOption = {
  id: string;
  label: string;
};

export type ProfileDefaults = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  bio: string;
  avatarInitials: string;
};

export type DangerZoneAction = {
  id: "transfer" | "archive";
  title: string;
  description: string;
  buttonLabel: string;
};
