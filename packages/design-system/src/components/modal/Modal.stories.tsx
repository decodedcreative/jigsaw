import type { Meta, StoryObj } from "@storybook/react";
import { Modal, ModalContent, ModalTrigger, ModalFooter } from "./index";
import { Button } from "../button/Button";

const meta = {
  title: "Design System/Modal",
  component: Modal,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <ModalTrigger>
      <Button>Open modal</Button>
      <Modal>
        <ModalContent title="Confirm action">
          {({ close }) => (
            <>
              <p className="text-sm text-foreground-secondary">
                Are you sure you want to continue? This action cannot be undone.
              </p>
              <ModalFooter>
                <Button onPress={close}>Cancel</Button>
                <Button variant="destructive" onPress={close}>Confirm</Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </ModalTrigger>
  ),
};
