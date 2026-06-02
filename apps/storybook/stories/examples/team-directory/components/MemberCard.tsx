import {
  Avatar,
  Badge,
  Button,
  Card,
  Modal,
  Select,
  SelectItem,
  Text,
  useToast,
} from "@jigsaw/design-system";
import { ROLE_VARIANT } from "../TeamDirectory.stories.constants";
import type { Member } from "../TeamDirectory.stories.types";

export const MemberCard = ({ member }: { member: Member }) => {
  const { addToast } = useToast();

  return (
    <Card
      classNameOverrides={{ component: "flex flex-col gap-0 overflow-hidden", content: "pt-0 pb-5 px-5" }}
    >
      {/* Top strip */}
      <div className="h-12 bg-gradient-to-r from-navy-800 to-navy-700" />

        {/* Avatar overlapping the strip */}
        <div className="-mt-6 mb-3">
          <Avatar size="lg" initials={member.initials} status={member.status} />
        </div>

        <div className="flex items-start justify-between gap-2 mb-1">
          <Text size="base" weight="semibold" className="leading-tight">{member.name}</Text>
          <Badge variant={ROLE_VARIANT[member.role]} size="sm">{member.role}</Badge>
        </div>

        <Text size="xs" className="text-foreground-secondary block mb-1">{member.email}</Text>
        <Text size="xs" muted className="block mb-4">
          {member.department} · Joined {member.joined}
        </Text>

        {/* Actions */}
        <div className="flex gap-2">
          <Modal
            title={`Edit role — ${member.name}`}
            trigger={
              <Button variant="secondary" size="sm" classNameOverrides={{ component: "flex-1" }}>
                Edit role
              </Button>
            }
            footer={
              <Button
                slot="close"
                onPress={() =>
                  addToast({
                    title: "Role updated",
                    description: `${member.name}'s role has been changed.`,
                    variant: "success",
                  })
                }
              >
                Save
              </Button>
            }
          >
            <Text size="sm" className="text-foreground-secondary mb-4">
              Choose a new role for <strong className="text-foreground-primary">{member.name}</strong>.
              This will update their permissions immediately.
            </Text>
            <Select label="Role" defaultSelectedKey={member.role.toLowerCase()}>
              <SelectItem id="viewer">Viewer — read-only access</SelectItem>
              <SelectItem id="editor">Editor — can create and edit</SelectItem>
              <SelectItem id="admin">Admin — full workspace access</SelectItem>
            </Select>
          </Modal>

          <Modal
            title="Remove member"
            trigger={
              <Button
                variant="ghost"
                size="sm"
                classNameOverrides={{ component: "flex-1 text-state-error-text hover:text-state-error-text" }}
              >
                Remove
              </Button>
            }
            footer={
              <Button
                slot="close"
                variant="destructive"
                onPress={() =>
                  addToast({
                    title: "Member removed",
                    description: `${member.name} has been removed.`,
                    variant: "error",
                  })
                }
              >
                Remove
              </Button>
            }
          >
            <Text size="sm" className="text-foreground-secondary mb-4">
              Remove <strong className="text-foreground-primary">{member.name}</strong> from this workspace?
              They will lose access immediately.
            </Text>
          </Modal>
        </div>
    </Card>
  );
};
