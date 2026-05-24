"use client";

import { ToastProvider } from "@jigsaw/design-system";
import { NotificationFeed } from "./sub-components/NotificationFeed";
import { Preferences } from "./sub-components/Preferences";

export default function NotificationsPage() {
  return (
    <ToastProvider position="bottom-right">
      <div className="p-6 md:p-8 max-w-3xl mx-auto">
        <NotificationFeed />
        <Preferences />
      </div>
    </ToastProvider>
  );
}
