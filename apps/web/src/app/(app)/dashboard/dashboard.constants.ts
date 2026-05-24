import type { BadgeVariant } from "@jigsaw/design-system";
import type { Activity, TeamMember } from "./dashboard.types";

export const ACTIVITY: Activity[] = [
  { id: "1", user: "Amara Osei",    initials: "AO", action: "merged",    target: "feat/button-link-variant", time: "2 min ago",  badge: "merged" },
  { id: "2", user: "James Howell",  initials: "JH", action: "deployed",  target: "chromatic-setup → main",   time: "14 min ago", badge: "deploy" },
  { id: "3", user: "Lena Fischer",  initials: "LF", action: "opened",    target: "fix/disclosure-collapsed", time: "1 hr ago",   badge: "pr"     },
  { id: "4", user: "Carlos Rivera", initials: "CR", action: "reviewed",  target: "feat/new-token-stories",   time: "3 hr ago"                    },
  { id: "5", user: "Priya Sharma",  initials: "PS", action: "commented", target: "Design Tokens/Shadows",    time: "Yesterday"                   },
];

export const TEAM: TeamMember[] = [
  { name: "James Howell",  initials: "JH", role: "Owner",  status: "online" },
  { name: "Amara Osei",    initials: "AO", role: "Admin",  status: "online" },
  { name: "Lena Fischer",  initials: "LF", role: "Editor", status: "away"   },
  { name: "Carlos Rivera", initials: "CR", role: "Editor", status: "busy"   },
];

export const BADGE_VARIANT: Record<string, BadgeVariant> = {
  merged: "success",
  deploy: "primary",
  pr: "secondary",
};
