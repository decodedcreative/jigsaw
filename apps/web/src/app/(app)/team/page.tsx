"use client";

import { useState } from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarStatusIndicator,
  Badge,
  Button,
  Card,
  Input,
  Modal,
  ModalContent,
  ModalFooter,
  ModalTrigger,
  Radio,
  RadioGroup,
  SearchField,
  Select,
  SelectItem,
  ToastProvider,
  useToast,
  type AvatarStatus,
  type BadgeVariant,
} from "@jigsaw/design-system";

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------
type Role = "Owner" | "Admin" | "Editor" | "Viewer";

type Member = {
  id: string;
  name: string;
  email: string;
  initials: string;
  role: Role;
  status: AvatarStatus;
  department: string;
  joined: string;
};

const INITIAL_MEMBERS: Member[] = [
  { id: "1", name: "James Howell",   email: "james@example.com",  initials: "JH", role: "Owner",  status: "online",  department: "Engineering", joined: "Jan 2023" },
  { id: "2", name: "Amara Osei",     email: "amara@example.com",  initials: "AO", role: "Admin",  status: "online",  department: "Design",      joined: "Mar 2023" },
  { id: "3", name: "Lena Fischer",   email: "lena@example.com",   initials: "LF", role: "Editor", status: "away",    department: "Product",     joined: "Jun 2023" },
  { id: "4", name: "Carlos Rivera",  email: "carlos@example.com", initials: "CR", role: "Editor", status: "busy",    department: "Engineering", joined: "Aug 2023" },
  { id: "5", name: "Priya Sharma",   email: "priya@example.com",  initials: "PS", role: "Viewer", status: "offline", department: "Marketing",   joined: "Sep 2023" },
  { id: "6", name: "Tom Nakamura",   email: "tom@example.com",    initials: "TN", role: "Editor", status: "online",  department: "Design",      joined: "Nov 2023" },
  { id: "7", name: "Sofia Andersen", email: "sofia@example.com",  initials: "SA", role: "Viewer", status: "offline", department: "Marketing",   joined: "Jan 2024" },
  { id: "8", name: "Ben O'Sullivan", email: "ben@example.com",    initials: "BO", role: "Admin",  status: "away",    department: "Engineering", joined: "Feb 2024" },
];

const ROLE_BADGE: Record<Role, BadgeVariant> = {
  Owner: "warning", Admin: "primary", Editor: "secondary", Viewer: "default",
};

// ---------------------------------------------------------------------------
// Inner page (needs ToastProvider in tree)
// ---------------------------------------------------------------------------
function TeamInner() {
  const { addToast } = useToast();
  const [members, setMembers] = useState(INITIAL_MEMBERS);
  const [query, setQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [deptFilter, setDeptFilter] = useState("all");
  const [inviteEmail, setInviteEmail] = useState("");
  const [pendingRole, setPendingRole] = useState<Record<string, string>>({});

  const filtered = members.filter((m) => {
    const q = query.toLowerCase();
    return (
      (q === "" || m.name.toLowerCase().includes(q) || m.email.toLowerCase().includes(q)) &&
      (roleFilter === "all" || m.role.toLowerCase() === roleFilter) &&
      (deptFilter === "all" || m.department === deptFilter)
    );
  });

  function handleRoleChange(id: string, role: Role) {
    setMembers((prev) => prev.map((m) => m.id === id ? { ...m, role } : m));
    const member = members.find((m) => m.id === id);
    addToast({ title: "Role updated", description: `${member?.name} is now ${role}.`, variant: "success" });
  }

  function handleRemove(id: string) {
    const member = members.find((m) => m.id === id);
    setMembers((prev) => prev.filter((m) => m.id !== id));
    addToast({ title: "Member removed", description: `${member?.name} has been removed.`, variant: "error" });
  }

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground-primary">Team</h1>
          <p className="text-sm text-foreground-secondary mt-1">
            {members.length} members across Engineering, Design, Product, and Marketing.
          </p>
        </div>

        {/* Invite modal */}
        <ModalTrigger>
          <Button>Invite member</Button>
          <Modal>
            <ModalContent title="Invite a teammate">
              {({ close }) => (
                <>
                  <p className="text-sm text-foreground-secondary mb-4">
                    They'll receive an email and be added as a Viewer by default.
                  </p>
                  <Input
                    label="Email address"
                    type="email"
                    placeholder="colleague@example.com"
                    value={inviteEmail}
                    onChange={setInviteEmail}
                  />
                  <ModalFooter>
                    <Button variant="secondary" onPress={close}>Cancel</Button>
                    <Button onPress={() => {
                      close();
                      addToast({ title: "Invite sent", description: `Invitation sent to ${inviteEmail || "your teammate"}.`, variant: "success" });
                      setInviteEmail("");
                    }}>
                      Send invite
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </ModalTrigger>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <div className="flex-1 min-w-48">
          <SearchField label="Search" placeholder="Search by name or email…" value={query} onChange={setQuery} />
        </div>
        <div className="w-36">
          <Select label="Role" selectedKey={roleFilter} onSelectionChange={(k) => setRoleFilter(k as string)}>
            <SelectItem id="all">All roles</SelectItem>
            <SelectItem id="owner">Owner</SelectItem>
            <SelectItem id="admin">Admin</SelectItem>
            <SelectItem id="editor">Editor</SelectItem>
            <SelectItem id="viewer">Viewer</SelectItem>
          </Select>
        </div>
        <div className="w-44">
          <Select label="Department" selectedKey={deptFilter} onSelectionChange={(k) => setDeptFilter(k as string)}>
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
            <Card
              key={m.id}
              classNameOverrides={{ component: "flex flex-col overflow-hidden", content: "pt-0 pb-5 px-5" }}
            >
              <div className="h-10 bg-gradient-to-r from-navy-800 to-navy-700" />
                <div className="-mt-5 mb-3">
                  <Avatar size="lg">
                    <AvatarFallback>{m.initials}</AvatarFallback>
                    <AvatarStatusIndicator status={m.status} />
                  </Avatar>
                </div>
                <div className="flex items-start justify-between gap-2 mb-0.5">
                  <p className="text-sm font-semibold text-foreground-primary leading-snug">{m.name}</p>
                  <Badge variant={ROLE_BADGE[m.role]} size="sm">{m.role}</Badge>
                </div>
                <p className="text-xs text-foreground-secondary mb-0.5">{m.email}</p>
                <p className="text-xs text-foreground-muted mb-4">{m.department} · Joined {m.joined}</p>

                {m.role !== "Owner" && (
                  <div className="flex gap-2">
                    {/* Edit role */}
                    <ModalTrigger>
                      <Button variant="secondary" size="sm">Edit role</Button>
                      <Modal>
                        <ModalContent title={`Edit role — ${m.name}`}>
                          {({ close }) => (
                            <>
                              <p className="text-sm text-foreground-secondary mb-4">Changes take effect immediately.</p>
                              <RadioGroup
                                label="Role"
                                value={pendingRole[m.id] ?? m.role.toLowerCase()}
                                onChange={(v) => setPendingRole((p) => ({ ...p, [m.id]: v }))}
                              >
                                <Radio value="viewer">Viewer — read-only</Radio>
                                <Radio value="editor">Editor — can create and edit</Radio>
                                <Radio value="admin">Admin — full access</Radio>
                              </RadioGroup>
                              <ModalFooter>
                                <Button variant="secondary" onPress={close}>Cancel</Button>
                                <Button onPress={() => {
                                  const r = pendingRole[m.id] ?? m.role.toLowerCase();
                                  handleRoleChange(m.id, (r.charAt(0).toUpperCase() + r.slice(1)) as Role);
                                  close();
                                }}>
                                  Save
                                </Button>
                              </ModalFooter>
                            </>
                          )}
                        </ModalContent>
                      </Modal>
                    </ModalTrigger>

                    {/* Remove */}
                    <ModalTrigger>
                      <Button variant="ghost" size="sm" classNameOverrides={{ component: "text-state-error-text hover:bg-state-error-bg" }}>Remove</Button>
                      <Modal>
                        <ModalContent title="Remove member">
                          {({ close }) => (
                            <>
                              <p className="text-sm text-foreground-secondary mb-4">
                                Remove <strong className="text-foreground-primary">{m.name}</strong> from this workspace? They'll lose access immediately.
                              </p>
                              <ModalFooter>
                                <Button variant="secondary" onPress={close}>Cancel</Button>
                                <Button variant="destructive" onPress={() => { handleRemove(m.id); close(); }}>Remove</Button>
                              </ModalFooter>
                            </>
                          )}
                        </ModalContent>
                      </Modal>
                    </ModalTrigger>
                  </div>
                )}
            </Card>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <p className="text-base font-medium text-foreground-primary mb-1">No members found</p>
          <p className="text-sm text-foreground-secondary">Try adjusting your search or filters.</p>
        </div>
      )}
    </div>
  );
}

export default function TeamPage() {
  return (
    <ToastProvider position="bottom-right">
      <TeamInner />
    </ToastProvider>
  );
}
