import type { Icon } from "@phosphor-icons/react";
import {
  CloudArrowUpIcon,
  GearIcon,
  GitBranchIcon,
  PaletteIcon,
  SquaresFourIcon,
  UsersIcon,
} from "@phosphor-icons/react";
import type { ActivityEvent, EventKind } from "./activity.types";

export const EVENTS: ActivityEvent[] = [
  { id: "1",  kind: "deploy",    actor: "James Howell",   initials: "JH", action: "deployed",       target: "main → Chromatic",              meta: "47 stories",        time: "09:14",  date: "Today",      badge: "success"   },
  { id: "2",  kind: "pr",        actor: "Amara Osei",     initials: "AO", action: "merged",         target: "feat/account-settings-page",    meta: "+312 −18",          time: "08:51",  date: "Today",      badge: "primary"   },
  { id: "3",  kind: "component", actor: "James Howell",   initials: "JH", action: "added",          target: "Tooltip component",             meta: "packages/design-system", time: "08:30", date: "Today",  badge: "secondary" },
  { id: "4",  kind: "token",     actor: "Amara Osei",     initials: "AO", action: "updated",        target: "grey palette → neutral",        meta: "18 semantic tokens", time: "Yesterday, 16:42", date: "Yesterday", badge: "warning" },
  { id: "5",  kind: "pr",        actor: "Lena Fischer",   initials: "LF", action: "opened",         target: "fix/disclosure-collapsed-space",meta: "+8 −2",             time: "Yesterday, 14:10", date: "Yesterday", badge: "default"  },
  { id: "6",  kind: "member",    actor: "James Howell",   initials: "JH", action: "invited",        target: "sofia@example.com",             meta: "Viewer",            time: "Yesterday, 11:05", date: "Yesterday", badge: "default"  },
  { id: "7",  kind: "deploy",    actor: "Carlos Rivera",  initials: "CR", action: "failed deploy",  target: "main → Chromatic",              meta: "3 regressions",     time: "Yesterday, 09:22", date: "Yesterday", badge: "error"    },
  { id: "8",  kind: "component", actor: "Lena Fischer",   initials: "LF", action: "added",          target: "Skeleton component",            meta: "packages/design-system", time: "2 days ago", date: "2 days ago", badge: "secondary" },
  { id: "9",  kind: "settings",  actor: "James Howell",   initials: "JH", action: "changed",        target: "workspace timezone",            meta: "UTC → Europe/London", time: "2 days ago", date: "2 days ago", badge: "default"   },
  { id: "10", kind: "token",     actor: "Amara Osei",     initials: "AO", action: "added",          target: "feedback-warning tokens",       meta: "6 new values",      time: "3 days ago", date: "3 days ago", badge: "warning" },
  { id: "11", kind: "member",    actor: "James Howell",   initials: "JH", action: "removed",        target: "Dan Yates",                     meta: "Editor",            time: "3 days ago", date: "3 days ago", badge: "error"    },
  { id: "12", kind: "pr",        actor: "Carlos Rivera",  initials: "CR", action: "merged",         target: "feat/mobile-nav-fullscreen",    meta: "+58 −46",           time: "4 days ago", date: "4 days ago", badge: "primary"  },
];

export const KIND_LABELS: Record<EventKind, string> = {
  deploy: "Deploy",
  pr: "Pull request",
  token: "Tokens",
  component: "Component",
  member: "Team",
  settings: "Settings",
};

export const KIND_ICONS: Record<EventKind, Icon> = {
  deploy: CloudArrowUpIcon,
  pr: GitBranchIcon,
  token: PaletteIcon,
  component: SquaresFourIcon,
  member: UsersIcon,
  settings: GearIcon,
};
