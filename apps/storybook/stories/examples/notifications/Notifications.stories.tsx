import type { Meta, StoryObj } from "@storybook/react";
import { ToastProvider, Text } from "@jigsaw/design-system";
import {
  NotificationFAQ,
  NotificationFeed,
  ToastPanel,
} from "./components";

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
const NotificationsPage = () => (
    <ToastProvider position="bottom-right">
      <div className="min-h-screen bg-surface-default p-8">
        <div className="max-w-2xl mx-auto flex flex-col gap-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground-primary">Notifications</h1>
            <Text size="sm" className="text-foreground-secondary mt-1">
              Toast demos, notification feeds, and disclosure FAQs.
            </Text>
          </div>
          <ToastPanel />
          <NotificationFeed />
          <NotificationFAQ />
        </div>
      </div>
    </ToastProvider>
);

const meta = {
  title: "Examples/Notifications",
  parameters: { layout: "fullscreen" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <NotificationsPage />,
};
