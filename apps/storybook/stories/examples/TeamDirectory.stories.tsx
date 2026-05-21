import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarStatusIndicator,
  Badge,
  Button,
  Card,
  CardContent,
  Modal,
  ModalContent,
  ModalFooter,
  ModalTrigger,
  SearchField,
  Select,
  SelectItem,
  Text,
  ToastProvider,
  useToast,
  type AvatarStatus,
  type BadgeVariant,
} from "@jigsaw/design-system";

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------
type Role = "Admin" | "Editor" | "Viewer" | "Owner";
type Member = {
  id: string;
  name: string;
  email: string;
  role: Role;
  status: AvatarStatus;
  initials: string;
  department: string;
  joined: string;
};

const MEMBERS: Member[] = [
  { id: "1", name: "James Howell",   email: "james@example.com",   role: "Owner",  status: "online",  initials: "JH", department: "Engineering", joined: "Jan 2023" },
  { id: "2", name: "Amara Osei",     email: "amara@example.com",   role: "Admin",  status: "online",  initials: "AO", department: "Design",      joined: "Mar 2023" },
  { id: "3", name: "Lena Fischer",   email: "lena@example.com",    role: "Editor", status: "away",    initials: "LF", department: "Product",     joined: "Jun 2023" },
  { id: "4", name: "Carlos Rivera",  email: "carlos@example.com",  role: "Editor", status: "busy",    initials: "CR", department: "Engineering", joined: "Aug 2023" },
  { id: "5", name: "Priya Sharma",   email: "priya@example.com",   role: "Viewer", status: "offline", initials: "PS", department: "Marketing",   joined: "Sep 2023" },
  { id: "6", name: "Tom Nakamura",   email: "tom@example.com",     role: "Editor", status: "online",  initials: "TN", department: "Design",      joined: "Nov 2023" },
  { id: "7", name: "Sofia Andersen", email: "sofia@example.com",   role: "Viewer", status: "offline", initials: "SA", department: "Marketing",   joined: "Jan 2024" },
  { id: "8", name: "Ben O'Sullivan",  email: "ben@example.com",    role: "Admin",  status: "away",    initials: "BO", department: "Engineering", joined: "Feb 2024" },
];

const ROLE_VARIANT: Record<Role, BadgeVariant> = {
  Owner:  "warning",
  Admin:  "primary",
  Editor: "secondary",
  Viewer: "default",
};

// ---------------------------------------------------------------------------
// Member card
// ---------------------------------------------------------------------------
function MemberCard({ member }: { member: Member }) {
  const { addToast } = useToast();

  return (
    <Card className="flex flex-col gap-0 overflow-hidden">
      {/* Top strip */}
      <div className="h-12 bg-gradient-to-r from-navy-800 to-navy-700" />

      <CardContent className="pt-0 pb-5 px-5">
        {/* Avatar overlapping the strip */}
        <div className="-mt-6 mb-3">
          <Avatar size="lg">
            <AvatarFallback>{member.initials}</AvatarFallback>
            <AvatarStatusIndicator status={member.status} />
          </Avatar>
        </div>

        <div className="flex items-start justify-between gap-2 mb-1">
          <Text variant="body-md" className="font-semibold leading-tight">{member.name}</Text>
          <Badge variant={ROLE_VARIANT[member.role]} size="sm">{member.role}</Badge>
        </div>

        <Text variant="caption" className="text-text-secondary block mb-1">{member.email}</Text>
        <Text variant="caption" className="text-text-muted block mb-4">
          {member.department} · Joined {member.joined}
        </Text>

        {/* Actions */}
        <div className="flex gap-2">
          <ModalTrigger>
            <Button variant="secondary" size="sm" className="flex-1">Edit role</Button>
            <Modal>
              <ModalContent title={`Edit role — ${member.name}`}>
                {({ close }) => (
                  <>
                    <Text variant="body-sm" className="text-text-secondary mb-4">
                      Choose a new role for <strong className="text-text-primary">{member.name}</strong>.
                      This will update their permissions immediately.
                    </Text>
                    <Select label="Role" defaultSelectedKey={member.role.toLowerCase()}>
                      <SelectItem id="viewer">Viewer — read-only access</SelectItem>
                      <SelectItem id="editor">Editor — can create and edit</SelectItem>
                      <SelectItem id="admin">Admin — full workspace access</SelectItem>
                    </Select>
                    <ModalFooter>
                      <Button variant="secondary" onPress={close}>Cancel</Button>
                      <Button
                        onPress={() => {
                          close();
                          addToast({ title: "Role updated", description: `${member.name}'s role has been changed.`, variant: "success" });
                        }}
                      >
                        Save
                      </Button>
                    </ModalFooter>
                  </>
                )}
              </ModalContent>
            </Modal>
          </ModalTrigger>

          <ModalTrigger>
            <Button variant="ghost" size="sm" className="flex-1 text-feedback-error hover:text-feedback-error">Remove</Button>
            <Modal>
              <ModalContent title="Remove member">
                {({ close }) => (
                  <>
                    <Text variant="body-sm" className="text-text-secondary mb-4">
                      Remove <strong className="text-text-primary">{member.name}</strong> from this workspace?
                      They will lose access immediately.
                    </Text>
                    <ModalFooter>
                      <Button variant="secondary" onPress={close}>Cancel</Button>
                      <Button
                        variant="destructive"
                        onPress={() => {
                          close();
                          addToast({ title: "Member removed", description: `${member.name} has been removed.`, variant: "error" });
                        }}
                      >
                        Remove
                      </Button>
                    </ModalFooter>
                  </>
                )}
              </ModalContent>
            </Modal>
          </ModalTrigger>
        </div>
      </CardContent>
    </Card>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
function TeamDirectoryPage() {
  const [query, setQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [deptFilter, setDeptFilter] = useState<string>("all");

  const filtered = MEMBERS.filter((m) => {
    const matchesQuery =
      query === "" ||
      m.name.toLowerCase().includes(query.toLowerCase()) ||
      m.email.toLowerCase().includes(query.toLowerCase());
    const matchesRole = roleFilter === "all" || m.role.toLowerCase() === roleFilter;
    const matchesDept = deptFilter === "all" || m.department === deptFilter;
    return matchesQuery && matchesRole && matchesDept;
  });

  return (
    <ToastProvider position="bottom-right">
      <div className="min-h-screen bg-surface-default p-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="flex items-start justify-between mb-8">
            <div>
              <Text variant="heading-lg" as="h1">Team</Text>
              <Text variant="body-sm" className="text-text-secondary mt-1">
                {MEMBERS.length} members across Engineering, Design, Product, and Marketing.
              </Text>
            </div>
            <Button>Invite member</Button>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-3 mb-6">
            <div className="flex-1 min-w-48">
              <SearchField
                label="Search"
                placeholder="Search by name or email…"
                value={query}
                onChange={setQuery}
              />
            </div>
            <div className="w-40">
              <Select
                label="Role"
                selectedKey={roleFilter}
                onSelectionChange={(k) => setRoleFilter(k as string)}
              >
                <SelectItem id="all">All roles</SelectItem>
                <SelectItem id="owner">Owner</SelectItem>
                <SelectItem id="admin">Admin</SelectItem>
                <SelectItem id="editor">Editor</SelectItem>
                <SelectItem id="viewer">Viewer</SelectItem>
              </Select>
            </div>
            <div className="w-44">
              <Select
                label="Department"
                selectedKey={deptFilter}
                onSelectionChange={(k) => setDeptFilter(k as string)}
              >
                <SelectItem id="all">All departments</SelectItem>
                <SelectItem id="Engineering">Engineering</SelectItem>
                <SelectItem id="Design">Design</SelectItem>
                <SelectItem id="Product">Product</SelectItem>
                <SelectItem id="Marketing">Marketing</SelectItem>
              </Select>
            </div>
          </div>

          {/* Grid */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {filtered.map((m) => (
                <MemberCard key={m.id} member={m} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <Text variant="body-md" className="font-medium mb-1">No members found</Text>
              <Text variant="body-sm" className="text-text-secondary">Try adjusting your search or filters.</Text>
            </div>
          )}
        </div>
      </div>
    </ToastProvider>
  );
}

const meta = {
  title: "Examples/Team Directory",
  parameters: { layout: "fullscreen" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <TeamDirectoryPage />,
};
