"use client";

import type { ReactNode } from "react";
import {
  H1,
  Subheading,
  Tab,
  TabList,
  TabPanel,
  Tabs,
  ToastProvider,
} from "@jigsaw/design-system";
import { SETTINGS_TABS } from "./settings.constants";
import type { SettingsTabId } from "./settings.types";
import { AppearanceTab } from "./sub-components/AppearanceTab";
import { DangerZoneTab } from "./sub-components/DangerZoneTab";
import { NotificationsTab } from "./sub-components/NotificationsTab";
import { ProfileTab } from "./sub-components/ProfileTab";

const TAB_PANELS: Record<SettingsTabId, ReactNode> = {
  profile: <ProfileTab />,
  notifications: <NotificationsTab />,
  appearance: <AppearanceTab />,
  danger: <DangerZoneTab />,
};

export default function SettingsPage() {
  return (
    <ToastProvider position="bottom-right">
      <div className="p-6 md:p-8 max-w-2xl mx-auto">
        <div className="flex flex-col gap-1 mb-8">
          <H1>Settings</H1>
          <Subheading>Manage your profile, notifications, and workspace preferences.</Subheading>
        </div>

        <Tabs defaultSelectedKey="profile">
          <TabList aria-label="Settings sections">
            {SETTINGS_TABS.map(({ id, label }) => (
              <Tab key={id} id={id}>
                {label}
              </Tab>
            ))}
          </TabList>

          <div className="mt-6">
            {SETTINGS_TABS.map(({ id }) => (
              <TabPanel key={id} id={id}>
                {TAB_PANELS[id]}
              </TabPanel>
            ))}
          </div>
        </Tabs>
      </div>
    </ToastProvider>
  );
}
