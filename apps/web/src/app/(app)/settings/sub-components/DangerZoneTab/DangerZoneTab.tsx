"use client";

import {
  Button,
  Input,
  Modal,
  ModalContent,
  ModalFooter,
  ModalTrigger,
  useToast,
} from "@jigsaw/design-system";
import { DANGER_ZONE_ACTIONS } from "../../settings.constants";

export function DangerZoneTab() {
  const { addToast } = useToast();

  return (
    <div className="flex flex-col gap-4">
      {DANGER_ZONE_ACTIONS.map(({ id, title, description, buttonLabel }) => (
        <div
          key={id}
          className="flex items-center justify-between p-4 rounded-lg border border-border-default"
        >
          <div>
            <p className="text-sm font-medium text-foreground-primary">{title}</p>
            <p className="text-xs text-foreground-secondary">{description}</p>
          </div>
          <Button size="sm">
            {buttonLabel}
          </Button>
        </div>
      ))}

      <div className="flex items-center justify-between p-4 rounded-lg border border-feedback-error bg-feedback-error-subtle">
        <div>
          <p className="text-sm font-medium text-feedback-error">Delete account</p>
          <p className="text-xs text-foreground-secondary">Permanently delete your account and all data.</p>
        </div>
        <ModalTrigger>
          <Button variant="destructive" size="sm">
            Delete account
          </Button>
          <Modal>
            <ModalContent title="Delete account">
              {({ close }) => (
                <>
                  <p className="text-sm text-foreground-secondary mb-4">
                    This will permanently delete your account and all associated data. This action{" "}
                    <strong className="text-foreground-primary">cannot be undone</strong>.
                  </p>
                  <Input label='Type "delete" to confirm' placeholder="delete" />
                  <ModalFooter>
                    <Button onPress={close}>
                      Cancel
                    </Button>
                    <Button
                      variant="destructive"
                      onPress={() => {
                        close();
                        addToast({ title: "Account scheduled for deletion", variant: "error" });
                      }}
                    >
                      Delete account
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </ModalTrigger>
      </div>
    </div>
  );
}
