"use client";

import { useState } from "react";
import {
  Badge,
  Button,
  Card,
  Checkbox,
  Disclosure,
  DisclosureGroup,
  Select,
  SelectItem,
  ToastProvider,
  useToast,
} from "@jigsaw/design-system";

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

const TYPE_CONFIG: Record<NotifType, { icon: React.ReactNode; bg: string; dot: string }> = {
  mention: {
    bg: "bg-interactive-accent/10",
    dot: "bg-interactive-accent",
    icon: (
      <svg className="w-4 h-4 text-interactive-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <circle cx="12" cy="12" r="4" /><path d="M16 8v5a3 3 0 006 0v-1a10 10 0 10-3.92 7.94" />
      </svg>
    ),
  },
  invite: {
    bg: "bg-state-success-bg",
    dot: "bg-state-success",
    icon: (
      <svg className="w-4 h-4 text-state-success-text" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><line x1="19" y1="8" x2="19" y2="14" /><line x1="22" y1="11" x2="16" y2="11" />
      </svg>
    ),
  },
  update: {
    bg: "bg-surface-muted",
    dot: "bg-foreground-muted",
    icon: (
      <svg className="w-4 h-4 text-foreground-secondary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <polyline points="23 4 23 10 17 10" /><path d="M20.49 15a9 9 0 11-2.12-9.36L23 10" />
      </svg>
    ),
  },
  alert: {
    bg: "bg-state-warning-bg",
    dot: "bg-state-warning",
    icon: (
      <svg className="w-4 h-4 text-state-warning-text" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
  },
  deploy: {
    bg: "bg-surface-muted",
    dot: "bg-interactive-accent",
    icon: (
      <svg className="w-4 h-4 text-foreground-secondary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <polyline points="16 16 12 12 8 16" /><line x1="12" y1="12" x2="12" y2="21" />
        <path d="M20.39 18.39A5 5 0 0018 9h-1.26A8 8 0 103 16.3" />
      </svg>
    ),
  },
};

// ---------------------------------------------------------------------------
// Preferences (exercises Checkbox + Disclosure)
// ---------------------------------------------------------------------------
type PrefKey = "mentions" | "deploys" | "invites" | "updates" | "alerts";

function Preferences() {
  const { addToast } = useToast();
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
                <Button size="sm" onPress={() => addToast({ title: "Preferences saved", variant: "success" })}>
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
  const { addToast } = useToast();
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
          <Select label="Show" selectedKey={filter} onSelectionChange={(k) => setFilter(k as string)}>
            <SelectItem id="all">All</SelectItem>
            <SelectItem id="unread">Unread</SelectItem>
            <SelectItem id="read">Read</SelectItem>
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
                      {cfg.icon}
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
                        addToast({ title: "Notification dismissed", variant: "default" });
                      }}
                      aria-label="Dismiss"
                    >
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <path d="M18 6 6 18M6 6l12 12" />
                      </svg>
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
  return (
    <ToastProvider position="bottom-right">
      <NotificationsInner />
    </ToastProvider>
  );
}
