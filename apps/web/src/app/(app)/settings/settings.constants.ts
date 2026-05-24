import type {
  DangerZoneAction,
  NotificationPrefOption,
  NotificationPrefs,
  ProfileDefaults,
  SelectOption,
  SettingsTab,
} from "./settings.types";

export const SETTINGS_TABS: SettingsTab[] = [
  { id: "profile", label: "Profile" },
  { id: "notifications", label: "Notifications" },
  { id: "appearance", label: "Appearance" },
  { id: "danger", label: "Danger zone" },
];

export const PROFILE_DEFAULTS: ProfileDefaults = {
  firstName: "James",
  lastName: "Howell",
  username: "jameshowell",
  email: "james@example.com",
  bio: "Building design systems.",
  avatarInitials: "JH",
};

export const DEFAULT_NOTIFICATION_PREFS: NotificationPrefs = {
  digest: true,
  product: true,
  security: true,
  activity: false,
};

export const NOTIFICATION_PREF_OPTIONS: NotificationPrefOption[] = [
  { key: "digest", label: "Weekly digest", desc: "A summary of activity from the past week." },
  { key: "product", label: "Product updates", desc: "New features and improvements to Jigsaw." },
  { key: "security", label: "Security alerts", desc: "Unusual sign-in activity and account changes." },
  { key: "activity", label: "Team activity", desc: "Comments, mentions, and assignments." },
];

export const TIMEZONE_OPTIONS: SelectOption[] = [
  { id: "utc", label: "UTC — Coordinated Universal Time" },
  { id: "london", label: "Europe/London (GMT+0)" },
  { id: "paris", label: "Europe/Paris (GMT+1)" },
  { id: "new_york", label: "America/New_York (GMT-5)" },
  { id: "la", label: "America/Los_Angeles (GMT-8)" },
  { id: "sydney", label: "Australia/Sydney (GMT+11)" },
];

export const DATE_FORMAT_OPTIONS: SelectOption[] = [
  { id: "dmy", label: "DD/MM/YYYY" },
  { id: "mdy", label: "MM/DD/YYYY" },
  { id: "ymd", label: "YYYY-MM-DD" },
];

export const LANGUAGE_OPTIONS: SelectOption[] = [
  { id: "en", label: "English" },
  { id: "fr", label: "Français" },
  { id: "de", label: "Deutsch" },
  { id: "es", label: "Español" },
];

export const DANGER_ZONE_ACTIONS: DangerZoneAction[] = [
  {
    id: "transfer",
    title: "Transfer ownership",
    description: "Transfer this workspace to another member.",
    buttonLabel: "Transfer",
  },
  {
    id: "archive",
    title: "Archive workspace",
    description: "Make this workspace read-only.",
    buttonLabel: "Archive",
  },
];
