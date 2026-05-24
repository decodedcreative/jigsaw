"use client";

import {
  Button,
  H1,
  Input,
  Modal,
  ModalContent,
  ModalFooter,
  ModalTrigger,
} from "@jigsaw/design-system";

type TeamHeaderProps = {
  subtitle: string;
  inviteEmail: string;
  onInviteEmailChange: (value: string) => void;
  onInviteSent: () => void;
};

export function TeamHeader({ subtitle, inviteEmail, onInviteEmailChange, onInviteSent }: TeamHeaderProps) {
  return (
    <div className="flex items-start justify-between mb-8">
      <div>
        <H1>Team</H1>
        <p className="text-sm text-foreground-secondary mt-1">{subtitle}</p>
      </div>

      <ModalTrigger>
        <Button variant="primary">Invite member</Button>
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
                  onChange={onInviteEmailChange}
                />
                <ModalFooter>
                  <Button onPress={close}>
                    Cancel
                  </Button>
                  <Button
                    variant="primary"
                    onPress={() => {
                      onInviteSent();
                      close();
                    }}
                  >
                    Send invite
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </ModalTrigger>
    </div>
  );
}
