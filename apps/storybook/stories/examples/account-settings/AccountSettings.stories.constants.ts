import type { SelectOption } from "./AccountSettings.stories.types";

export const TIMEZONES: SelectOption[] = [
  { id: "utc", label: "UTC — Coordinated Universal Time" },
  { id: "london", label: "Europe/London (GMT+0)" },
  { id: "paris", label: "Europe/Paris (GMT+1)" },
  { id: "new_york", label: "America/New_York (GMT-5)" },
  { id: "la", label: "America/Los_Angeles (GMT-8)" },
  { id: "sydney", label: "Australia/Sydney (GMT+11)" },
];

export const DATE_FORMATS: SelectOption[] = [
  { id: "dmy", label: "DD/MM/YYYY" },
  { id: "mdy", label: "MM/DD/YYYY" },
  { id: "ymd", label: "YYYY-MM-DD" },
];

export const LANGUAGES: SelectOption[] = [
  { id: "en", label: "English" },
  { id: "fr", label: "Français" },
  { id: "de", label: "Deutsch" },
  { id: "es", label: "Español" },
];
