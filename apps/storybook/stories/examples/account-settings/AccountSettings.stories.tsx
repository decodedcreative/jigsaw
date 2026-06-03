import type { Meta, StoryObj } from "@storybook/react";
import {
  Tab,
  TabList,
  TabPanel,
  Tabs,
  Text,
  ToastRegion,
} from "@jigsaw/design-system";
import {
  AppearanceTab,
  DangerZoneTab,
  NotificationsTab,
  ProfileTab,
} from "./components";

const AccountSettingsPage = () => (
  <div className="min-h-screen bg-surface-default p-8">
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground-primary">Account settings</h1>
        <Text
          size="sm"
          classNameOverrides={{ component: "text-foreground-secondary mt-1" }}
        >
          Manage your profile, notifications, and workspace preferences.
        </Text>
      </div>

      <Tabs defaultSelectedKey="profile">
        <TabList aria-label="Settings sections">
          <Tab id="profile">Profile</Tab>
          <Tab id="notifications">Notifications</Tab>
          <Tab id="appearance">Appearance</Tab>
          <Tab id="danger">Danger zone</Tab>
        </TabList>

        <div className="mt-6">
          <TabPanel id="profile"><ProfileTab /></TabPanel>
          <TabPanel id="notifications"><NotificationsTab /></TabPanel>
          <TabPanel id="appearance"><AppearanceTab /></TabPanel>
          <TabPanel id="danger"><DangerZoneTab /></TabPanel>
        </div>
      </Tabs>
    </div>
  </div>
);

const meta = {
  title: "Examples/Account Settings",
  parameters: { layout: "fullscreen" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <>
      <AccountSettingsPage />
      <ToastRegion position="bottom-right" />
    </>
  ),
};
