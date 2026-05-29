import type { BadgeVariant } from "@jigsaw/design-system";
import type { Member, Role } from "./TeamDirectory.stories.types";

export const MEMBERS: Member[] = [
  { id: "1", name: "James Howell",   email: "james@example.com",   role: "Owner",  status: "online",  initials: "JH", department: "Engineering", joined: "Jan 2023" },
  { id: "2", name: "Amara Osei",     email: "amara@example.com",   role: "Admin",  status: "online",  initials: "AO", department: "Design",      joined: "Mar 2023" },
  { id: "3", name: "Lena Fischer",   email: "lena@example.com",    role: "Editor", status: "away",    initials: "LF", department: "Product",     joined: "Jun 2023" },
  { id: "4", name: "Carlos Rivera",  email: "carlos@example.com",  role: "Editor", status: "busy",    initials: "CR", department: "Engineering", joined: "Aug 2023" },
  { id: "5", name: "Priya Sharma",   email: "priya@example.com",   role: "Viewer", status: "offline", initials: "PS", department: "Marketing",   joined: "Sep 2023" },
  { id: "6", name: "Tom Nakamura",   email: "tom@example.com",     role: "Editor", status: "online",  initials: "TN", department: "Design",      joined: "Nov 2023" },
  { id: "7", name: "Sofia Andersen", email: "sofia@example.com",   role: "Viewer", status: "offline", initials: "SA", department: "Marketing",   joined: "Jan 2024" },
  { id: "8", name: "Ben O'Sullivan",  email: "ben@example.com",    role: "Admin",  status: "away",    initials: "BO", department: "Engineering", joined: "Feb 2024" },
];

export const ROLE_VARIANT: Record<Role, BadgeVariant> = {
  Owner:  "warning",
  Admin:  "primary",
  Editor: "secondary",
  Viewer: "default",
};
