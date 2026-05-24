import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import {
  Badge,
  Button,
  Card,
  CardContent,
  Checkbox,
  Disclosure,
  DisclosureGroup,
  Select,
  H1,
  H3,
  SelectItem,
  Text,
  ToastProvider,
  useToast,
  type ToastVariant,
} from "@jigsaw/design-system";

// ---------------------------------------------------------------------------
// Toast demo panel
// ---------------------------------------------------------------------------
const TOAST_EXAMPLES: { label: string; variant: ToastVariant; title: string; description?: string }[] = [
  { label: "Success",     variant: "success", title: "Changes saved",       description: "Your settings have been updated successfully." },
  { label: "Error",       variant: "error",   title: "Something went wrong", description: "We couldn't process your request. Please try again." },
  { label: "Warning",     variant: "warning", title: "Storage almost full", description: "You're using 90% of your 5 GB limit." },
  { label: "Info",        variant: "info",    title: "Maintenance scheduled", description: "We'll be down for maintenance on Sunday at 2 AM UTC." },
  { label: "Title only",  variant: "default", title: "Copied to clipboard" },
  {
    label: "With action",
    variant: "default",
    title: "Message deleted",
    description: "The message was moved to trash.",
  },
];

function ToastPanel() {
  const { addToast } = useToast();
  const [position, setPosition] = useState<string>("bottom-right");

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <H3>Toast notifications</H3>
          <div className="w-48">
            <Select
              label="Position"
              value={position}
              onChange={(k) => setPosition(k as string)}
            >
              <SelectItem id="top-left">Top left</SelectItem>
              <SelectItem id="top-center">Top centre</SelectItem>
              <SelectItem id="top-right">Top right</SelectItem>
              <SelectItem id="bottom-left">Bottom left</SelectItem>
              <SelectItem id="bottom-center">Bottom centre</SelectItem>
              <SelectItem id="bottom-right">Bottom right</SelectItem>
            </Select>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {TOAST_EXAMPLES.map((t) => (
            <Button
              key={t.label}
              size="sm"
              onPress={() =>
                addToast({
                  title: t.title,
                  description: t.description,
                  variant: t.variant,
                  ...(t.label === "With action"
                    ? { action: { label: "Undo", onClick: () => addToast({ title: "Message restored", variant: "success" }) } }
                    : {}),
                })
              }
            >
              {t.label}
            </Button>
          ))}
          <Button
            size="sm"
            onPress={() => {
              addToast({ title: "Step 1 of 3 complete", variant: "info" });
              setTimeout(() => addToast({ title: "Step 2 of 3 complete", variant: "info" }), 800);
              setTimeout(() => addToast({ title: "All done!", variant: "success" }), 1600);
            }}
          >
            Sequence
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

// ---------------------------------------------------------------------------
// Notification feed
// ---------------------------------------------------------------------------
type Notification = {
  id: string;
  type: "mention" | "invite" | "update" | "alert";
  title: string;
  body: string;
  time: string;
  read: boolean;
};

const FEED: Notification[] = [
  { id: "1", type: "mention", title: "Amara mentioned you",       body: "\"@james can you review the updated token spec?\"",          time: "2 min ago",  read: false },
  { id: "2", type: "invite",  title: "Team invite accepted",      body: "Lena Fischer joined the Design workspace.",                  time: "14 min ago", read: false },
  { id: "3", type: "alert",   title: "Storage 90% full",          body: "Upgrade your plan to avoid service interruption.",           time: "1 hr ago",   read: false },
  { id: "4", type: "update",  title: "Jigsaw v2.1.0 released",    body: "New: Select, NumberField, and Tooltip components.",          time: "3 hr ago",   read: true  },
  { id: "5", type: "mention", title: "Carlos mentioned you",      body: "\"@james the button link variant looks great!\"",           time: "Yesterday",  read: true  },
  { id: "6", type: "update",  title: "Chromatic build passed",    body: "All 42 stories captured with no visual regressions.",       time: "Yesterday",  read: true  },
];

const TYPE_ICON: Record<Notification["type"], React.ReactNode> = {
  mention: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="12" cy="12" r="4" /><path d="M16 8v5a3 3 0 006 0v-1a10 10 0 10-3.92 7.94" />
    </svg>
  ),
  invite: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><line x1="19" y1="8" x2="19" y2="14" /><line x1="22" y1="11" x2="16" y2="11" />
    </svg>
  ),
  update: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <polyline points="23 4 23 10 17 10" /><path d="M20.49 15a9 9 0 11-2.12-9.36L23 10" />
    </svg>
  ),
  alert: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),
};

const TYPE_COLOR: Record<Notification["type"], string> = {
  mention: "bg-interactive-accent/10 text-interactive-accent",
  invite:  "bg-feedback-success-subtle text-feedback-success",
  update:  "bg-surface-muted text-foreground-secondary",
  alert:   "bg-feedback-warning-subtle text-feedback-warning",
};

function NotificationFeed() {
  const [items, setItems] = useState(FEED);
  const unread = items.filter((n) => !n.read).length;

  const markAllRead = () => setItems((prev) => prev.map((n) => ({ ...n, read: true })));
  const markRead = (id: string) => setItems((prev) => prev.map((n) => n.id === id ? { ...n, read: true } : n));

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <H3>Notifications</H3>
            {unread > 0 && <Badge variant="primary" size="sm">{unread}</Badge>}
          </div>
          <Button variant="ghost" size="sm" isDisabled={unread === 0} onPress={markAllRead}>
            Mark all as read
          </Button>
        </div>

        <div className="divide-y divide-border-subtle">
          {items.map((n) => (
            <button
              key={n.id}
              className="w-full flex items-start gap-3 py-3 text-left hover:bg-surface-hover rounded-md px-2 -mx-2 transition-colors"
              onClick={() => markRead(n.id)}
            >
              {/* Dot */}
              <div className="mt-1 w-2 shrink-0">
                {!n.read && <div className="w-2 h-2 rounded-full bg-interactive-accent" />}
              </div>
              {/* Icon */}
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${TYPE_COLOR[n.type]}`}>
                {TYPE_ICON[n.type]}
              </div>
              {/* Content */}
              <div className="flex-1 min-w-0">
                <Text variant="body-sm" className={n.read ? "text-foreground-secondary" : "font-medium"}>{n.title}</Text>
                <Text variant="caption" className="text-foreground-secondary truncate block">{n.body}</Text>
                <Text variant="caption" className="text-foreground-muted mt-0.5">{n.time}</Text>
              </div>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// ---------------------------------------------------------------------------
// Preference FAQs
// ---------------------------------------------------------------------------
function NotificationFAQ() {
  return (
    <Card>
      <CardContent className="p-6">
        <H3 classNameOverrides={{ component: ["mb-4"] }}>Frequently asked questions</H3>
        <DisclosureGroup>
          <Disclosure title="How do I mute a specific channel?">
            Open the channel settings, click the bell icon, and select <strong>Mute</strong>. You can set a duration or mute indefinitely.
          </Disclosure>
          <Disclosure title="Why am I getting duplicate notifications?">
            This can happen if you're logged into multiple devices. Check your notification settings on each device and ensure push notifications are only enabled on your primary device.
          </Disclosure>
          <Disclosure title="Can I schedule a do-not-disturb window?">
            Yes — go to <strong>Settings → Notifications → Quiet hours</strong> and set your preferred start and end times. Notifications are queued and delivered when the window ends.
          </Disclosure>
          <Disclosure title="How do I export a notification history?">
            Notification history can be exported from <strong>Settings → Data → Export</strong>. You'll receive a CSV or JSON file via email within a few minutes.
          </Disclosure>
        </DisclosureGroup>
      </CardContent>
    </Card>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
function NotificationsPage() {
  return (
    <ToastProvider position="bottom-right">
      <div className="min-h-screen bg-surface-default p-8">
        <div className="max-w-2xl mx-auto flex flex-col gap-6">
          <div>
            <H1>Notifications</H1>
            <Text variant="body-sm" className="text-foreground-secondary mt-1">
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
}

const meta = {
  title: "Examples/Notifications",
  parameters: { layout: "fullscreen" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <NotificationsPage />,
};
