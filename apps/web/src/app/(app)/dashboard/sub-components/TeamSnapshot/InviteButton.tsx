"use client";

import {
  Button,
  Modal,
  ModalContent,
  ModalFooter,
  ModalTrigger,
  useToast,
} from "@jigsaw/design-system";

export function InviteButton() {
  const { addToast } = useToast();

  return (
    <ModalTrigger>
      <Button variant="primary" size="sm">Invite</Button>
      <Modal>
        <ModalContent title="Invite a teammate">
          {({ close }) => (
            <>
              <p className="text-sm text-foreground-secondary mb-4">
                Send an invite link to a new team member. They'll be added as a Viewer by default.
              </p>
              <input
                type="email"
                placeholder="colleague@example.com"
                className="w-full text-sm px-3 py-2 rounded-md border border-border-default bg-surface-default text-foreground-primary placeholder:text-foreground-placeholder focus:outline-none focus:ring-2 focus:ring-interactive-accent/40 focus:border-interactive-accent"
              />
              <ModalFooter>
                <Button onPress={close}>
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  onPress={() => {
                    close();
                    addToast({ title: "Invite sent!", variant: "success" });
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
  );
}
