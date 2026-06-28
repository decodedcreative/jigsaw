import type { AvatarStatus } from "@jigsaw-ds/design-system";

export type Role = "Admin" | "Editor" | "Viewer" | "Owner";

export type Member = {
  id: string;
  name: string;
  email: string;
  role: Role;
  status: AvatarStatus;
  initials: string;
  department: string;
  joined: string;
};
