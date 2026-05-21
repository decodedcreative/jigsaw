import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarStatusIndicator,
  Badge,
  Button,
  Checkbox,
  Disclosure,
  Form,
  FormActions,
  FormFieldset,
  Input,
  Modal,
  ModalContent,
  ModalFooter,
  ModalTrigger,
  Select,
  SelectItem,
  Tab,
  TabList,
  TabPanel,
  Tabs,
  Text,
  Textarea,
  ToastProvider,
  useToast,
} from "@jigsaw/design-system";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function SaveButton() {
  const { addToast } = useToast();
  return (
    <Button
      type="submit"
      onPress={() =>
        addToast({ title: "Settings saved", description: "Your changes have been applied.", variant: "success" })
      }
    >
      Save changes
    </Button>
  );
}

// ---------------------------------------------------------------------------
// Tabs
// ---------------------------------------------------------------------------
function ProfileTab() {
  return (
    <Form onSubmit={(e) => e.preventDefault()}>
      <FormFieldset legend="Public profile">
        <div className="flex items-center gap-4 mb-2">
          <Avatar size="xl">
            <AvatarFallback>JH</AvatarFallback>
            <AvatarStatusIndicator status="online" />
          </Avatar>
          <div className="flex gap-2">
            <Button variant="secondary" size="sm">Upload photo</Button>
            <Button variant="ghost" size="sm">Remove</Button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input label="First name" defaultValue="James" />
          <Input label="Last name" defaultValue="Howell" />
        </div>
        <Input label="Username" defaultValue="jameshowell" />
        <Input label="Email address" type="email" defaultValue="james@example.com" />
        <Textarea label="Bio" defaultValue="Building design systems." rows={3} />
      </FormFieldset>
      <FormActions>
        <Button variant="secondary">Cancel</Button>
        <SaveButton />
      </FormActions>
    </Form>
  );
}

function NotificationsTab() {
  const [emailDigest, setEmailDigest] = useState(true);
  const [productUpdates, setProductUpdates] = useState(true);
  const [securityAlerts, setSecurityAlerts] = useState(true);
  const [teamActivity, setTeamActivity] = useState(false);

  const { addToast } = useToast();

  return (
    <Form onSubmit={(e) => e.preventDefault()}>
      <FormFieldset legend="Email notifications">
        <div className="flex flex-col gap-3">
          <Checkbox isSelected={emailDigest} onChange={setEmailDigest}>
            <span className="font-medium">Weekly digest</span>
            <span className="block text-xs text-text-secondary">A summary of activity from the past week.</span>
          </Checkbox>
          <Checkbox isSelected={productUpdates} onChange={setProductUpdates}>
            <span className="font-medium">Product updates</span>
            <span className="block text-xs text-text-secondary">New features and improvements.</span>
          </Checkbox>
          <Checkbox isSelected={securityAlerts} onChange={setSecurityAlerts}>
            <span className="font-medium">Security alerts</span>
            <span className="block text-xs text-text-secondary">Unusual sign-in activity and account changes.</span>
          </Checkbox>
          <Checkbox isSelected={teamActivity} onChange={setTeamActivity}>
            <span className="font-medium">Team activity</span>
            <span className="block text-xs text-text-secondary">Comments, mentions, and assignments.</span>
          </Checkbox>
        </div>
      </FormFieldset>
      <FormActions>
        <Button variant="secondary">Cancel</Button>
        <Button
          onPress={() =>
            addToast({ title: "Preferences saved", variant: "success" })
          }
        >
          Save changes
        </Button>
      </FormActions>
    </Form>
  );
}

function AppearanceTab() {
  return (
    <Form onSubmit={(e) => e.preventDefault()}>
      <FormFieldset legend="Display preferences">
        <Select label="Timezone" defaultSelectedKey="utc">
          <SelectItem id="utc">UTC — Coordinated Universal Time</SelectItem>
          <SelectItem id="london">Europe/London (GMT+0)</SelectItem>
          <SelectItem id="paris">Europe/Paris (GMT+1)</SelectItem>
          <SelectItem id="new_york">America/New_York (GMT-5)</SelectItem>
          <SelectItem id="la">America/Los_Angeles (GMT-8)</SelectItem>
          <SelectItem id="sydney">Australia/Sydney (GMT+11)</SelectItem>
        </Select>
        <Select label="Date format" defaultSelectedKey="dmy">
          <SelectItem id="dmy">DD/MM/YYYY</SelectItem>
          <SelectItem id="mdy">MM/DD/YYYY</SelectItem>
          <SelectItem id="ymd">YYYY-MM-DD</SelectItem>
        </Select>
        <Select label="Language" defaultSelectedKey="en">
          <SelectItem id="en">English</SelectItem>
          <SelectItem id="fr">Français</SelectItem>
          <SelectItem id="de">Deutsch</SelectItem>
          <SelectItem id="es">Español</SelectItem>
        </Select>
      </FormFieldset>
      <FormActions>
        <Button variant="secondary">Cancel</Button>
        <SaveButton />
      </FormActions>
    </Form>
  );
}

function DangerZoneTab() {
  const { addToast } = useToast();

  return (
    <div className="flex flex-col gap-4">
      {/* Transfer */}
      <div className="flex items-center justify-between p-4 rounded-lg border border-border-default">
        <div>
          <Text variant="body-sm" className="font-medium">Transfer ownership</Text>
          <Text variant="caption" className="text-text-secondary">Transfer this workspace to another member.</Text>
        </div>
        <Button variant="secondary" size="sm">Transfer</Button>
      </div>

      {/* Archive */}
      <div className="flex items-center justify-between p-4 rounded-lg border border-border-default">
        <div>
          <Text variant="body-sm" className="font-medium">Archive workspace</Text>
          <Text variant="caption" className="text-text-secondary">Make this workspace read-only and hide it from navigation.</Text>
        </div>
        <Button variant="secondary" size="sm">Archive</Button>
      </div>

      {/* Delete */}
      <div className="flex items-center justify-between p-4 rounded-lg border border-feedback-error bg-feedback-error-subtle">
        <div>
          <Text variant="body-sm" className="font-medium text-feedback-error">Delete account</Text>
          <Text variant="caption" className="text-text-secondary">Permanently delete your account and all data. This cannot be undone.</Text>
        </div>
        <ModalTrigger>
          <Button variant="destructive" size="sm">Delete account</Button>
          <Modal>
            <ModalContent title="Delete account">
              {({ close }) => (
                <>
                  <Text variant="body-sm" className="text-text-secondary mb-4">
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
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
function AccountSettingsPage() {
  return (
    <ToastProvider position="bottom-right">
      <div className="min-h-screen bg-surface-default p-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Text variant="heading-lg" as="h1">Account settings</Text>
            <Text variant="body-sm" className="text-text-secondary mt-1">
              Manage your profile, notifications, and workspace preferences.
            </Text>
          </div>

          {/* Tabs */}
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
    </ToastProvider>
  );
}

const meta = {
  title: "Examples/Account Settings",
  parameters: { layout: "fullscreen" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <AccountSettingsPage />,
};
