import type { AvatarStatus } from "@jigsaw/design-system";

export type Activity = {
  id: string;
  user: string;
  initials: string;
  action: string;
  target: string;
  time: string;
  badge?: string;
};

export type TeamMember = {
  name: string;
  initials: string;
  role: string;
  status: AvatarStatus;
};
