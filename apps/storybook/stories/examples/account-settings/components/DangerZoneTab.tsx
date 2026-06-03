import {
  Button,
  Input,
  Modal,
  Text,
  toast,
} from "@jigsaw/design-system";

export const DangerZoneTab = () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between p-4 rounded-lg border border-border-default">
        <div>
          <Text size="sm" weight="medium">Transfer ownership</Text>
          <Text size="xs" className="text-foreground-secondary">Transfer this workspace to another member.</Text>
        </div>
        <Button variant="secondary" size="sm">Transfer</Button>
      </div>

      <div className="flex items-center justify-between p-4 rounded-lg border border-border-default">
        <div>
          <Text size="sm" weight="medium">Archive workspace</Text>
          <Text size="xs" className="text-foreground-secondary">Make this workspace read-only and hide it from navigation.</Text>
        </div>
        <Button variant="secondary" size="sm">Archive</Button>
      </div>

      <div className="flex items-center justify-between p-4 rounded-lg border border-state-error-border bg-state-error-bg">
        <div>
          <Text size="sm" weight="medium" className="text-state-error-text">Delete account</Text>
          <Text size="xs" className="text-foreground-secondary">Permanently delete your account and all data. This cannot be undone.</Text>
        </div>
        <Modal
          title="Delete account"
          trigger={<Button variant="destructive" size="sm">Delete account</Button>}
          footer={
            <Button
              slot="close"
              variant="destructive"
              onPress={() => toast({ title: "Account scheduled for deletion", variant: "error" })}
            >
              Delete account
            </Button>
          }
        >
          <Text size="sm" className="text-foreground-secondary mb-4">
            This will permanently delete your account, all workspaces, and all associated data.
            This action <strong className="text-foreground-primary">cannot be undone</strong>.
          </Text>
          <Input label='Type "delete" to confirm' placeholder="delete" />
        </Modal>
      </div>
    </div>
);
