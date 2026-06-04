"use client";

import { useState } from "react";
import {
  Avatar,
  Button,
  Checkbox,
  CheckboxGroup,
  Form,
  FormGroup,
  H3,
  Input,
  Modal,
  Select,
  SelectItem,
  Tab,
  TabList,
  TabPanel,
  Tabs,
  Text,
  Textarea,
  toast,
} from "@jigsaw/design-system";

// ---------------------------------------------------------------------------
// Profile tab
// ---------------------------------------------------------------------------
function ProfileTab() {
  return (
    <Form onSubmit={(e) => { e.preventDefault(); toast({ title: "Profile saved", variant: "success" }); }}>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <H3 size="h4">Public profile</H3>
          <div className="flex items-center gap-4">
            <Avatar size="xl" initials="JH" status="online" />
            <div className="flex gap-2">
              <Button variant="secondary" size="sm">Upload photo</Button>
              <Button variant="ghost" size="sm">Remove</Button>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input label="First name" defaultValue="James" />
            <Input label="Last name" defaultValue="Howell" />
          </div>
          <Input label="Username" defaultValue="jameshowell" />
          <Input label="Email address" type="email" defaultValue="james@example.com" />
          <Textarea label="Bio" defaultValue="Building design systems." rows={3} />
        </div>
      </div>
      <div className="flex items-center gap-3 mt-6 pt-6 border-t border-border-default">
        <Button variant="secondary">Cancel</Button>
        <Button type="submit">Save changes</Button>
      </div>
    </Form>
  );
}

// ---------------------------------------------------------------------------
// Notifications tab
// ---------------------------------------------------------------------------
function NotificationsTab() {
  const [selected, setSelected] = useState<string[]>(["digest", "product", "security"]);

  return (
    <Form onSubmit={(e) => { e.preventDefault(); toast({ title: "Preferences saved", variant: "success" }); }}>
      <FormGroup title="Email notifications">
        <CheckboxGroup value={selected} onChange={setSelected}>
          <Checkbox
            value="digest"
            label="Weekly digest"
            description="A summary of activity from the past week."
          />
          <Checkbox
            value="product"
            label="Product updates"
            description="New features and improvements to Jigsaw."
          />
          <Checkbox
            value="security"
            label="Security alerts"
            description="Unusual sign-in activity and account changes."
          />
          <Checkbox
            value="activity"
            label="Team activity"
            description="Comments, mentions, and assignments."
          />
        </CheckboxGroup>
      </FormGroup>
      <div className="flex items-center gap-3 mt-6 pt-6 border-t border-border-default">
        <Button variant="secondary">Cancel</Button>
        <Button type="submit">Save changes</Button>
      </div>
    </Form>
  );
}

// ---------------------------------------------------------------------------
// Appearance tab
// ---------------------------------------------------------------------------
function AppearanceTab() {
  return (
    <Form onSubmit={(e) => { e.preventDefault(); toast({ title: "Preferences saved", variant: "success" }); }}>
      <FormGroup title="Display preferences">
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
      </FormGroup>
      <div className="flex items-center gap-3 mt-6 pt-6 border-t border-border-default">
        <Button variant="secondary">Cancel</Button>
        <Button type="submit">Save changes</Button>
      </div>
    </Form>
  );
}

// ---------------------------------------------------------------------------
// Danger zone tab
// ---------------------------------------------------------------------------
function DangerZoneTab() {

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between p-4 rounded-lg border border-border-default">
        <div>
          <p className="text-sm font-medium text-foreground-primary">Transfer ownership</p>
          <p className="text-xs text-foreground-secondary">Transfer this workspace to another member.</p>
        </div>
        <Button variant="secondary" size="sm">Transfer</Button>
      </div>

      <div className="flex items-center justify-between p-4 rounded-lg border border-border-default">
        <div>
          <p className="text-sm font-medium text-foreground-primary">Archive workspace</p>
          <p className="text-xs text-foreground-secondary">Make this workspace read-only.</p>
        </div>
        <Button variant="secondary" size="sm">Archive</Button>
      </div>

      <div className="flex items-center justify-between p-4 rounded-lg border border-state-error-border bg-state-error-bg">
        <div>
          <p className="text-sm font-medium text-state-error-text">Delete account</p>
          <p className="text-xs text-foreground-secondary">Permanently delete your account and all data.</p>
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
          <p className="text-sm text-foreground-secondary mb-4">
            This will permanently delete your account and all associated data.
            This action <strong className="text-foreground-primary">cannot be undone</strong>.
          </p>
          <Input label='Type "delete" to confirm' placeholder="delete" />
        </Modal>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default function SettingsPage() {
  return (
      <div className="p-6 md:p-8 max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground-primary">Settings</h1>
          <p className="text-sm text-foreground-secondary mt-1">
            Manage your profile, notifications, and workspace preferences.
          </p>
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
  );
}
