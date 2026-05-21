"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarStatusIndicator,
  Badge,
  Button,
  Card,
  CardContent,
  CardTitle,
  Modal,
  ModalContent,
  ModalFooter,
  ModalTrigger,
  Text,
  ToastProvider,
  useToast,
} from "@jigsaw/design-system";

// ---------------------------------------------------------------------------
// Stat card
// ---------------------------------------------------------------------------
function StatCard({
  label,
  value,
  delta,
  positive,
}: {
  label: string;
  value: string;
  delta: string;
  positive: boolean;
}) {
  return (
    <Card>
      <CardContent className="p-5">
        <Text size="xs" muted className="block mb-1">{label}</Text>
        <p className="text-2xl font-bold text-text-primary mb-2">{value}</p>
        <span className={`inline-flex items-center gap-1 text-xs font-medium ${positive ? "text-feedback-success" : "text-feedback-error"}`}>
          {positive ? "↑" : "↓"} {delta} vs last month
        </span>
      </CardContent>
    </Card>
  );
}

// ---------------------------------------------------------------------------
// Activity feed
// ---------------------------------------------------------------------------
type Activity = { id: string; user: string; initials: string; action: string; target: string; time: string; badge?: string };

const ACTIVITY: Activity[] = [
  { id: "1", user: "Amara Osei",    initials: "AO", action: "merged",    target: "feat/button-link-variant", time: "2 min ago",  badge: "merged" },
  { id: "2", user: "James Howell",  initials: "JH", action: "deployed",  target: "chromatic-setup → main",   time: "14 min ago", badge: "deploy" },
  { id: "3", user: "Lena Fischer",  initials: "LF", action: "opened",    target: "fix/disclosure-collapsed", time: "1 hr ago",   badge: "pr"     },
  { id: "4", user: "Carlos Rivera", initials: "CR", action: "reviewed",  target: "feat/new-token-stories",   time: "3 hr ago"                    },
  { id: "5", user: "Priya Sharma",  initials: "PS", action: "commented", target: "Design Tokens/Shadows",    time: "Yesterday"                   },
];

const BADGE_VARIANT: Record<string, React.ComponentProps<typeof Badge>["variant"]> = {
  merged: "success",
  deploy: "primary",
  pr:     "secondary",
};

function ActivityFeed() {
  return (
    <Card>
      <CardContent className="p-5">
        <CardTitle className="mb-4">Recent activity</CardTitle>
        <div className="divide-y divide-border-subtle">
          {ACTIVITY.map((a) => (
            <div key={a.id} className="flex items-center gap-3 py-3">
              <Avatar size="sm">
                <AvatarFallback>{a.initials}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-text-primary">
                  <span className="font-medium">{a.user}</span>{" "}
                  <span className="text-text-secondary">{a.action}</span>{" "}
                  <span className="font-mono text-xs bg-surface-muted px-1.5 py-0.5 rounded">{a.target}</span>
                </p>
                <p className="text-xs text-text-muted mt-0.5">{a.time}</p>
              </div>
              {a.badge && (
                <Badge variant={BADGE_VARIANT[a.badge]} size="sm">{a.badge}</Badge>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// ---------------------------------------------------------------------------
// Team snapshot
// ---------------------------------------------------------------------------
type Member = { name: string; initials: string; role: string; status: "online" | "away" | "busy" | "offline" };

const TEAM: Member[] = [
  { name: "James Howell",  initials: "JH", role: "Owner",  status: "online" },
  { name: "Amara Osei",    initials: "AO", role: "Admin",  status: "online" },
  { name: "Lena Fischer",  initials: "LF", role: "Editor", status: "away"   },
  { name: "Carlos Rivera", initials: "CR", role: "Editor", status: "busy"   },
];

function InviteButton() {
  const { addToast } = useToast();
  return (
    <ModalTrigger>
      <Button size="sm">Invite</Button>
      <Modal>
        <ModalContent title="Invite a teammate">
          {({ close }) => (
            <>
              <p className="text-sm text-text-secondary mb-4">
                Send an invite link to a new team member. They'll be added as a Viewer by default.
              </p>
              <input
                type="email"
                placeholder="colleague@example.com"
                className="w-full text-sm px-3 py-2 rounded-md border border-border-default bg-surface-default text-text-primary placeholder:text-text-placeholder focus:outline-none focus:ring-2 focus:ring-interactive-accent/40 focus:border-interactive-accent"
              />
              <ModalFooter>
                <Button variant="secondary" onPress={close}>Cancel</Button>
                <Button onPress={() => { close(); addToast({ title: "Invite sent!", variant: "success" }); }}>
                  Send invite
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </ModalTrigger>
  );
}

function TeamSnapshot() {
  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex items-center justify-between mb-4">
          <CardTitle>Team</CardTitle>
          <InviteButton />
        </div>
        <div className="flex flex-col gap-3">
          {TEAM.map((m) => (
            <div key={m.name} className="flex items-center gap-3">
              <Avatar size="sm">
                <AvatarFallback>{m.initials}</AvatarFallback>
                <AvatarStatusIndicator status={m.status} />
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-text-primary leading-tight">{m.name}</p>
                <p className="text-xs text-text-secondary">{m.role}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// ---------------------------------------------------------------------------
// Quick actions
// ---------------------------------------------------------------------------
function QuickActions() {
  const { addToast } = useToast();

  return (
    <Card>
      <CardContent className="p-5">
        <CardTitle className="mb-4">Quick actions</CardTitle>
        <div className="flex flex-col gap-2">
          <Button
            variant="secondary"
            className="w-full"
            classNameOverrides={{ component: ["justify-start"] }}
            onPress={() => addToast({ title: "Build triggered", description: "Storybook deploying to Chromatic.", variant: "info" })}
          >
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            Trigger Storybook build
          </Button>
          <Button
            variant="secondary"
            className="w-full"
            classNameOverrides={{ component: ["justify-start"] }}
            onPress={() => addToast({ title: "Tokens rebuilt", variant: "success" })}
          >
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 11-2.12-9.36L23 10"/></svg>
            Rebuild design tokens
          </Button>
          <Button variant="secondary" className="w-full" classNameOverrides={{ component: ["justify-start"] }}>
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            Open Storybook
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default function DashboardPage() {
  return (
    <ToastProvider position="bottom-right">
      <div className="p-6 md:p-8 max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-text-primary">Good morning, James 👋</h1>
          <p className="text-sm text-text-secondary mt-1">Here's what's happening with Jigsaw today.</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard label="Components"   value="22"  delta="4"  positive={true}  />
          <StatCard label="Token values" value="184" delta="18" positive={true}  />
          <StatCard label="Stories"      value="47"  delta="12" positive={true}  />
          <StatCard label="Open PRs"     value="2"   delta="1"  positive={false} />
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
