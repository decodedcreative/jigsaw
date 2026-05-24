"use client";

import { useState } from "react";
import { Notice, Subheading, useToast } from "@jigsaw/design-system";
import { INITIAL_MEMBERS, teamSubtitle } from "../../team.constants";
import type { Member, Role } from "../../team.types";
import { MemberCard } from "../MemberCard";
import { TeamFilters } from "../TeamFilters";
import { TeamHeader } from "../TeamHeader";

export function TeamDirectory() {
  const { addToast } = useToast();
  const [members, setMembers] = useState<Member[]>(INITIAL_MEMBERS);
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

  const handleRoleChange = (id: string, role: Role) => {
    setMembers((prev) => prev.map((m) => (m.id === id ? { ...m, role } : m)));
    const member = members.find((m) => m.id === id);
    addToast({
      title: "Role updated",
      description: `${member?.name} is now ${role}.`,
      variant: "success",
    });
  };

  const handleRemove = (id: string) => {
    const member = members.find((m) => m.id === id);
    setMembers((prev) => prev.filter((m) => m.id !== id));
    addToast({
      title: "Member removed",
      description: `${member?.name} has been removed.`,
      variant: "error",
    });
  };

  const handlePendingRoleChange = (memberId: string, role: string) => {
    setPendingRole((p) => ({ ...p, [memberId]: role }));
  };

  const handleInviteSent = () => {
    addToast({
      title: "Invite sent",
      description: `Invitation sent to ${inviteEmail || "your teammate"}.`,
      variant: "success",
    });
    setInviteEmail("");
  };

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto">
      <TeamHeader
        subtitle={teamSubtitle(members.length)}
        inviteEmail={inviteEmail}
        onInviteEmailChange={setInviteEmail}
        onInviteSent={handleInviteSent}
      />

      <TeamFilters
        query={query}
        roleFilter={roleFilter}
        deptFilter={deptFilter}
        onQueryChange={setQuery}
        onRoleFilterChange={setRoleFilter}
        onDeptFilterChange={setDeptFilter}
      />

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filtered.map((member) => (
            <MemberCard
              key={member.id}
              member={member}
              pendingRole={pendingRole[member.id]}
              onPendingRoleChange={handlePendingRoleChange}
              onRoleChange={handleRoleChange}
              onRemove={handleRemove}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-1 py-24 text-center">
          <Notice>No members found</Notice>
          <Subheading>Try adjusting your search or filters.</Subheading>
        </div>
      )}
    </div>
  );
}
