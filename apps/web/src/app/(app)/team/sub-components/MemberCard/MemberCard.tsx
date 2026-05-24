"use client";

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
  Radio,
  RadioGroup,
} from "@jigsaw/design-system";
import { EDITABLE_ROLE_OPTIONS, ROLE_BADGE, toRole } from "../../team.constants";
import type { MemberCardProps } from "../../team.types";

export function MemberCard({
  member,
  pendingRole,
  onPendingRoleChange,
  onRoleChange,
  onRemove,
}: MemberCardProps) {
  return (
    <Card classNameOverrides={{ component: ["flex", "flex-col", "overflow-hidden"] }}>
      <div className="h-10 bg-gradient-to-r from-navy-800 to-navy-700" />
      <CardContent padding="none" classNameOverrides={{ content: ["pt-0", "pb-5", "px-5"] }}>
        <div className="-mt-5 mb-3">
          <Avatar size="lg">
            <AvatarFallback>{member.initials}</AvatarFallback>
            <AvatarStatusIndicator status={member.status} />
          </Avatar>
        </div>
        <div className="flex items-start justify-between gap-2 mb-0.5">
          <p className="text-sm font-semibold text-foreground-primary leading-snug">{member.name}</p>
          <Badge variant={ROLE_BADGE[member.role]} size="sm">
            {member.role}
          </Badge>
        </div>
        <p className="text-xs text-foreground-secondary mb-0.5">{member.email}</p>
        <p className="text-xs text-foreground-muted mb-4">
          {member.department} · Joined {member.joined}
        </p>

        {member.role !== "Owner" && (
          <div className="flex gap-2">
            <ModalTrigger>
              <Button size="sm">
                Edit role
              </Button>
              <Modal>
                <ModalContent title={`Edit role — ${member.name}`}>
                  {({ close }) => (
                    <>
                      <p className="text-sm text-foreground-secondary mb-4">Changes take effect immediately.</p>
                      <RadioGroup
                        label="Role"
                        value={pendingRole ?? member.role.toLowerCase()}
                        onChange={(value) => onPendingRoleChange(member.id, value)}
                      >
                        {EDITABLE_ROLE_OPTIONS.map(({ value, label }) => (
                          <Radio key={value} value={value}>
                            {label}
                          </Radio>
                        ))}
                      </RadioGroup>
                      <ModalFooter>
                        <Button onPress={close}>
                          Cancel
                        </Button>
                        <Button
                          variant="primary"
                          onPress={() => {
                            onRoleChange(member.id, toRole(pendingRole ?? member.role.toLowerCase()));
                            close();
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
              <Button
                variant="ghost"
                size="sm"
                classNameOverrides={{
                  component: ["text-feedback-error", "hover:bg-feedback-error-subtle"],
                }}
              >
                Remove
              </Button>
              <Modal>
                <ModalContent title="Remove member">
                  {({ close }) => (
                    <>
                      <p className="text-sm text-foreground-secondary mb-4">
                        Remove <strong className="text-foreground-primary">{member.name}</strong> from this
                        workspace? They'll lose access immediately.
                      </p>
                      <ModalFooter>
                        <Button onPress={close}>
                          Cancel
                        </Button>
                        <Button
                          variant="destructive"
                          onPress={() => {
                            onRemove(member.id);
                            close();
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
        )}
      </CardContent>
    </Card>
  );
}
