import type { AvatarStatus, BadgeVariant } from "@jigsaw/design-system";

export type Role = "Owner" | "Admin" | "Editor" | "Viewer";

export type Member = {
  id: string;
  name: string;
  email: string;
  initials: string;
  role: Role;
  status: AvatarStatus;
  department: string;
  joined: string;
};

export type SelectOption = {
  id: string;
  label: string;
};

export type RoleRadioOption = {
  value: string;
  label: string;
};

export type MemberCardProps = {
  member: Member;
  pendingRole: string | undefined;
  onPendingRoleChange: (memberId: string, role: string) => void;
  onRoleChange: (memberId: string, role: Role) => void;
  onRemove: (memberId: string) => void;
};

export type RoleBadgeMap = Record<Role, BadgeVariant>;
