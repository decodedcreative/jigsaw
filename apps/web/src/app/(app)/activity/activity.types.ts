import type { BadgeVariant } from "@jigsaw/design-system";

export type EventKind = "deploy" | "pr" | "token" | "component" | "member" | "settings";

export type ActivityEvent = {
  id: string;
  kind: EventKind;
  actor: string;
  initials: string;
  action: string;
  target: string;
  meta?: string;
  time: string;
  date: string;
  badge: BadgeVariant;
};
