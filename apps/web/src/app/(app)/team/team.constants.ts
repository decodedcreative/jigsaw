import type { Member, Role, RoleBadgeMap, RoleRadioOption, SelectOption } from "./team.types";

export const INITIAL_MEMBERS: Member[] = [
  { id: "1", name: "James Howell", email: "james@example.com", initials: "JH", role: "Owner", status: "online", department: "Engineering", joined: "Jan 2023" },
  { id: "2", name: "Amara Osei", email: "amara@example.com", initials: "AO", role: "Admin", status: "online", department: "Design", joined: "Mar 2023" },
  { id: "3", name: "Lena Fischer", email: "lena@example.com", initials: "LF", role: "Editor", status: "away", department: "Product", joined: "Jun 2023" },
  { id: "4", name: "Carlos Rivera", email: "carlos@example.com", initials: "CR", role: "Editor", status: "busy", department: "Engineering", joined: "Aug 2023" },
  { id: "5", name: "Priya Sharma", email: "priya@example.com", initials: "PS", role: "Viewer", status: "offline", department: "Marketing", joined: "Sep 2023" },
  { id: "6", name: "Tom Nakamura", email: "tom@example.com", initials: "TN", role: "Editor", status: "online", department: "Design", joined: "Nov 2023" },
  { id: "7", name: "Sofia Andersen", email: "sofia@example.com", initials: "SA", role: "Viewer", status: "offline", department: "Marketing", joined: "Jan 2024" },
  { id: "8", name: "Ben O'Sullivan", email: "ben@example.com", initials: "BO", role: "Admin", status: "away", department: "Engineering", joined: "Feb 2024" },
];

export const ROLE_BADGE: RoleBadgeMap = {
  Owner: "warning",
  Admin: "primary",
  Editor: "secondary",
  Viewer: "default",
};

export const DEPARTMENTS = ["Engineering", "Design", "Product", "Marketing"] as const;

export const ROLE_FILTER_OPTIONS: SelectOption[] = [
  { id: "all", label: "All roles" },
  { id: "owner", label: "Owner" },
  { id: "admin", label: "Admin" },
  { id: "editor", label: "Editor" },
  { id: "viewer", label: "Viewer" },
];

export const DEPARTMENT_FILTER_OPTIONS: SelectOption[] = [
  { id: "all", label: "All departments" },
  ...DEPARTMENTS.map((dept) => ({ id: dept, label: dept })),
];

export const EDITABLE_ROLE_OPTIONS: RoleRadioOption[] = [
  { value: "viewer", label: "Viewer — read-only" },
  { value: "editor", label: "Editor — can create and edit" },
  { value: "admin", label: "Admin — full access" },
];

export function toRole(value: string): Role {
  return (value.charAt(0).toUpperCase() + value.slice(1)) as Role;
}

export function teamSubtitle(memberCount: number): string {
  return `${memberCount} members across ${DEPARTMENTS.join(", ")}.`;
}
