import {
  Avatar,
  AvatarFallback,
  AvatarStatusIndicator,
  Badge,
  Button,
  Card,
  Modal,
  ModalContent,
  ModalFooter,
  ModalTrigger,
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
      className="flex flex-col gap-0 overflow-hidden"
      classNameOverrides={{ content: ["pt-0", "pb-5", "px-5"] }}
    >
      {/* Top strip */}
      <div className="h-12 bg-gradient-to-r from-navy-800 to-navy-700" />

        {/* Avatar overlapping the strip */}
        <div className="-mt-6 mb-3">
          <Avatar size="lg">
            <AvatarFallback>{member.initials}</AvatarFallback>
            <AvatarStatusIndicator status={member.status} />
          </Avatar>
        </div>

        <div className="flex items-start justify-between gap-2 mb-1">
          <Text size="base" weight="semibold" className="leading-tight">{member.name}</Text>
          <Badge variant={ROLE_VARIANT[member.role]} size="sm">{member.role}</Badge>
        </div>

        <Text size="xs" className="text-text-secondary block mb-1">{member.email}</Text>
        <Text size="xs" muted className="block mb-4">
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
                    <Text size="sm" className="text-text-secondary mb-4">
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
                    <Text size="sm" className="text-text-secondary mb-4">
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
    </Card>
  );
};
