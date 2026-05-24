"use client";

import { H1, Subheading, ToastProvider } from "@jigsaw/design-system";
import { ActivityFeed } from "./sub-components/ActivityFeed";
import { QuickActions } from "./sub-components/QuickActions";
import { StatCard } from "./sub-components/StatCard";
import { TeamSnapshot } from "./sub-components/TeamSnapshot";

export default function DashboardPage() {
  return (
    <ToastProvider position="bottom-right">
      <div className="p-6 md:p-8 max-w-6xl mx-auto">
        <div className="flex flex-col gap-1 mb-8">
          <H1>Good morning, James 👋</H1>
          <Subheading>Here's what's happening with Jigsaw today.</Subheading>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard label="Components" value="22" delta="4" positive />
          <StatCard label="Token values" value="184" delta="18" positive />
          <StatCard label="Stories" value="47" delta="12" positive />
          <StatCard label="Open PRs" value="2" delta="1" positive={false} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <ActivityFeed />
          </div>
          <div className="flex flex-col gap-4">
            <TeamSnapshot />
            <QuickActions />
          </div>
        </div>
      </div>
    </ToastProvider>
  );
}
