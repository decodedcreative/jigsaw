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

export const TYPE_ICON: Record<Notification["type"], React.ReactNode> = {
  mention: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="12" cy="12" r="4" /><path d="M16 8v5a3 3 0 006 0v-1a10 10 0 10-3.92 7.94" />
    </svg>
  ),
  invite: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><line x1="19" y1="8" x2="19" y2="14" /><line x1="22" y1="11" x2="16" y2="11" />
    </svg>
  ),
  update: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <polyline points="23 4 23 10 17 10" /><path d="M20.49 15a9 9 0 11-2.12-9.36L23 10" />
    </svg>
  ),
  alert: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),
};

export const TYPE_COLOR: Record<Notification["type"], string> = {
  mention: "bg-interactive-accent/10 text-interactive-accent",
  invite:  "bg-feedback-success-subtle text-feedback-success",
  update:  "bg-surface-muted text-text-secondary",
  alert:   "bg-feedback-warning-subtle text-feedback-warning",
};
