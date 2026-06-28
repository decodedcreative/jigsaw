import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import {
  Button,
  SearchField,
  Select,
  Text,
  ToastRegion,
} from "@jigsaw-ds/design-system";
import { MEMBERS } from "./TeamDirectory.stories.constants";
import { MemberCard } from "./components";

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
const TeamDirectoryPage = () => {
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
      <div className="min-h-screen bg-surface-default p-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="flex items-start justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground-primary">Team</h1>
              <Text
                size="sm"
                classNameOverrides={{ component: "text-foreground-secondary mt-1" }}
              >
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
                value={roleFilter}
                onChange={(k) => setRoleFilter(k as string)}
              >
                <Select.Item id="all">All roles</Select.Item>
                <Select.Item id="owner">Owner</Select.Item>
                <Select.Item id="admin">Admin</Select.Item>
                <Select.Item id="editor">Editor</Select.Item>
                <Select.Item id="viewer">Viewer</Select.Item>
              </Select>
            </div>
            <div className="w-44">
              <Select
                label="Department"
                value={deptFilter}
                onChange={(k) => setDeptFilter(k as string)}
              >
                <Select.Item id="all">All departments</Select.Item>
                <Select.Item id="Engineering">Engineering</Select.Item>
                <Select.Item id="Design">Design</Select.Item>
                <Select.Item id="Product">Product</Select.Item>
                <Select.Item id="Marketing">Marketing</Select.Item>
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
              <Text size="base" weight="medium" classNameOverrides={{ component: "mb-1" }}>
                No members found
              </Text>
              <Text size="sm" classNameOverrides={{ component: "text-foreground-secondary" }}>
                Try adjusting your search or filters.
              </Text>
            </div>
          )}
        </div>
      </div>
  );
};

const meta = {
  title: "Examples/Team Directory",
  parameters: { layout: "fullscreen" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <>
      <TeamDirectoryPage />
      <ToastRegion position="bottom-right" />
    </>
  ),
};
