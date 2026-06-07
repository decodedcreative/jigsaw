"use client";

import { useState } from "react";
import {
  Badge,
  Button,
  Card,
  Checkbox,
  Disclosure,
  DisclosureGroup,
  Icon,
  Select,
  toast,
  type IconTone,
} from "@jigsaw/design-system";
import {
  ArrowClockwiseIcon,
  AtIcon,
  CloudArrowUpIcon,
  UserPlusIcon,
  WarningIcon,
  XIcon,
  type Icon as PhosphorIcon,
} from "@phosphor-icons/react";

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------
type NotifType = "mention" | "invite" | "update" | "alert" | "deploy";

type Notification = {
  id: string;
  type: NotifType;
  title: string;
  body: string;
  time: string;
  read: boolean;
};

const INITIAL: Notification[] = [
  { id: "1", type: "mention", title: "Amara mentioned you",        body: '"@james can you review the updated token spec?"',            time: "2 min ago",  read: false },
  { id: "2", type: "deploy",  title: "Chromatic build passed",     body: "All 47 stories captured with no visual regressions.",        time: "18 min ago", read: false },
  { id: "3", type: "invite",  title: "Team invite accepted",       body: "Sofia Andersen joined the Design workspace.",               time: "1 hr ago",   read: false },
  { id: "4", type: "alert",   title: "Storage 90% full",           body: "You're using 4.5 GB of your 5 GB limit. Upgrade your plan.", time: "3 hr ago",   read: false },
  { id: "5", type: "mention", title: "Carlos mentioned you",       body: '"@james the button link variant looks great!"',             time: "Yesterday",  read: true  },
  { id: "6", type: "update",  title: "Jigsaw v2.1.0 released",    body: "New: Select, NumberField, and Tooltip components added.",    time: "Yesterday",  read: true  },
  { id: "7", type: "deploy",  title: "Chromatic build failed",     body: "3 stories changed unexpectedly. Review required.",          time: "2 days ago", read: true  },
  { id: "8", type: "invite",  title: "New member joined",          body: "Tom Nakamura joined the Design workspace.",                 time: "3 days ago", read: true  },
];

const TYPE_CONFIG: Record<
  NotifType,
  { icon: PhosphorIcon; tone: IconTone; bg: string; dot: string }
> = {
  mention: {
    icon: AtIcon,
    tone: "accent",
    bg: "bg-interactive-accent/10",
    dot: "bg-interactive-accent",
  },
  invite: {
    icon: UserPlusIcon,
    tone: "success",
    bg: "bg-state-success-bg",
    dot: "bg-state-success",
  },
  update: {
    icon: ArrowClockwiseIcon,
    tone: "secondary",
    bg: "bg-surface-muted",
    dot: "bg-foreground-muted",
  },
  alert: {
    icon: WarningIcon,
    tone: "warning",
    bg: "bg-state-warning-bg",
    dot: "bg-state-warning",
  },
  deploy: {
    icon: CloudArrowUpIcon,
    tone: "secondary",
    bg: "bg-surface-muted",
    dot: "bg-interactive-accent",
  },
};

// ---------------------------------------------------------------------------
// Preferences (exercises Checkbox + Disclosure)
// ---------------------------------------------------------------------------
type PrefKey = "mentions" | "deploys" | "invites" | "updates" | "alerts";

function Preferences() {
  const [prefs, setPrefs] = useState<Record<PrefKey, boolean>>({
    mentions: true, deploys: true, invites: true, updates: false, alerts: true,
  });

  const toggle = (key: PrefKey) => (v: boolean) => setPrefs((p) => ({ ...p, [key]: v }));

  return (
    <Card classNameOverrides={{ content: "p-5" }}>
      <DisclosureGroup>
          <Disclosure title="Email preferences">
            <div className="flex flex-col gap-3 mt-2">
              {([
                { key: "mentions",  label: "Mentions",       desc: "When someone @mentions you."               },
                { key: "deploys",   label: "Deployments",    desc: "Build and deploy status updates."           },
                { key: "invites",   label: "Team changes",   desc: "Members joining or leaving workspaces."     },
                { key: "updates",   label: "Product updates",desc: "New features and release notes."            },
                { key: "alerts",    label: "Alerts",         desc: "Storage, security, and billing warnings."   },
              ] as { key: PrefKey; label: string; desc: string }[]).map(({ key, label, desc }) => (
                <Checkbox key={key} isSelected={prefs[key]} onChange={toggle(key)}>
                  <span className="font-medium">{label}</span>
                  <span className="block text-xs text-foreground-secondary">{desc}</span>
                </Checkbox>
              ))}
              <div className="pt-2">
                <Button size="sm" onPress={() => toast({ title: "Preferences saved", variant: "success" })}>
                  Save preferences
                </Button>
              </div>
            </div>
          </Disclosure>
        </DisclosureGroup>
    </Card>
  );
}

// ---------------------------------------------------------------------------
// Inner page
// ---------------------------------------------------------------------------
function NotificationsInner() {
  const [items, setItems] = useState(INITIAL);
  const [filter, setFilter] = useState("all");

  const unread = items.filter((n) => !n.read).length;

  const filtered = filter === "unread"
    ? items.filter((n) => !n.read)
    : filter === "read"
    ? items.filter((n) => n.read)
    : items;

  const markRead = (id: string) => setItems((prev) => prev.map((n) => n.id === id ? { ...n, read: true } : n));
  const markAllRead = () => setItems((prev) => prev.map((n) => ({ ...n, read: true })));
  const dismiss = (id: string) => setItems((prev) => prev.filter((n) => n.id !== id));

  return (
    <div className="p-6 md:p-8 max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold text-foreground-primary">Notifications</h1>
          {unread > 0 && <Badge variant="primary">{unread}</Badge>}
        </div>
        <Button variant="secondary" size="sm" isDisabled={unread === 0} onPress={markAllRead}>
          Mark all as read
        </Button>
      </div>

      {/* Filter + feed */}
      <div className="flex items-center justify-between mb-4">
        <div className="w-36">
          <Select label="Show" value={filter} onChange={(k) => setFilter(k as string)}>
            <Select.Item id="all">All</Select.Item>
            <Select.Item id="unread">Unread</Select.Item>
            <Select.Item id="read">Read</Select.Item>
          </Select>
        </div>
        <p className="text-xs text-foreground-muted">{filtered.length} notification{filtered.length !== 1 ? "s" : ""}</p>
      </div>

      <Card classNameOverrides={{ component: "mb-6", content: "p-0" }}>
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <p className="text-base font-medium text-foreground-primary mb-1">All caught up</p>
              <p className="text-sm text-foreground-secondary">No notifications to show.</p>
            </div>
          ) : (
            <div className="divide-y divide-border-subtle">
              {filtered.map((n) => {
                const cfg = TYPE_CONFIG[n.type];
                return (
                  <div
                    key={n.id}
                    className={`flex items-start gap-3 px-4 py-4 transition-colors ${!n.read ? "bg-interactive-accent/5" : ""}`}
                  >
                    {/* Unread dot */}
                    <div className="mt-1.5 w-2 shrink-0">
                      {!n.read && <div className={`w-2 h-2 rounded-full ${cfg.dot}`} />}
                    </div>
                    {/* Icon */}
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${cfg.bg}`}>
                      <Icon icon={cfg.icon} size="md" tone={cfg.tone} />
                    </div>
                    {/* Content */}
                    <button
                      className="flex-1 min-w-0 text-left"
                      onClick={() => markRead(n.id)}
                    >
                      <p className={`text-sm leading-snug ${n.read ? "text-foreground-secondary" : "font-medium text-foreground-primary"}`}>
                        {n.title}
                      </p>
                      <p className="text-xs text-foreground-secondary mt-0.5 leading-relaxed">{n.body}</p>
                      <p className="text-xs text-foreground-muted mt-1">{n.time}</p>
                    </button>
                    {/* Dismiss */}
                    <button
                      className="shrink-0 p-1 rounded text-foreground-muted hover:text-foreground-primary hover:bg-surface-hover transition-colors"
                      onClick={() => {
                        dismiss(n.id);
                        toast({ title: "Notification dismissed", variant: "default" });
                      }}
                      aria-label="Dismiss"
                    >
                      <Icon icon={XIcon} size="sm" />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
      </Card>

      {/* Preferences */}
      <Preferences />
    </div>
  );
}

export default function NotificationsPage() {
  return <NotificationsInner />;
}
