import type { Meta, StoryObj } from "@storybook/react";
import { ToastProvider, useToast } from "./index";
import { Button } from "../button/Button";

const meta = {
  title: "Design System/Toast",
  component: ToastProvider,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof ToastProvider>;

export default meta;
type Story = StoryObj<typeof meta>;

const Trigger = () => {
  const { addToast } = useToast();
  return (
    <div className="flex flex-wrap gap-2">
      <Button variant="primary" onPress={() => addToast({ title: "Saved", description: "Your changes are saved.", variant: "success" })}>
        Success
      </Button>
      <Button variant="destructive" onPress={() => addToast({ title: "Error", description: "Something went wrong.", variant: "error" })}>
        Error
      </Button>
    </div>
  );
};

export const Default: Story = {
  render: () => (
    <ToastProvider>
      <Trigger />
    </ToastProvider>
  ),
};
