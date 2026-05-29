import {
  Button,
  Input,
  Modal,
  ModalContent,
  ModalFooter,
  ModalTrigger,
  Text,
  useToast,
} from "@jigsaw/design-system";

export const DangerZoneTab = () => {
  const { addToast } = useToast();

  return (
    <div className="flex flex-col gap-4">
      {/* Transfer */}
      <div className="flex items-center justify-between p-4 rounded-lg border border-border-default">
        <div>
          <Text size="sm" weight="medium">Transfer ownership</Text>
          <Text size="xs" className="text-text-secondary">Transfer this workspace to another member.</Text>
        </div>
        <Button variant="secondary" size="sm">Transfer</Button>
      </div>

      {/* Archive */}
      <div className="flex items-center justify-between p-4 rounded-lg border border-border-default">
        <div>
          <Text size="sm" weight="medium">Archive workspace</Text>
          <Text size="xs" className="text-text-secondary">Make this workspace read-only and hide it from navigation.</Text>
        </div>
        <Button variant="secondary" size="sm">Archive</Button>
      </div>

      {/* Delete */}
      <div className="flex items-center justify-between p-4 rounded-lg border border-feedback-error bg-feedback-error-subtle">
        <div>
          <Text size="sm" weight="medium" className="text-feedback-error">Delete account</Text>
          <Text size="xs" className="text-text-secondary">Permanently delete your account and all data. This cannot be undone.</Text>
        </div>
        <ModalTrigger>
          <Button variant="destructive" size="sm">Delete account</Button>
          <Modal>
            <ModalContent title="Delete account">
              {({ close }) => (
                <>
                  <Text size="sm" className="text-text-secondary mb-4">
                    This will permanently delete your account, all workspaces, and all associated data.
                    This action <strong className="text-text-primary">cannot be undone</strong>.
                  </Text>
                  <Input label='Type "delete" to confirm' placeholder="delete" />
                  <ModalFooter>
                    <Button variant="secondary" onPress={close}>Cancel</Button>
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
};
