"use client";

import { useState } from "react";
import {
  Avatar,
  AvatarFallback,
  Badge,
  Button,
  Card,
  Icon,
  SearchField,
  Select,
  SelectItem,
  Tooltip,
  TooltipTrigger,
  type BadgeVariant,
} from "@jigsaw/design-system";
import {
  CloudArrowUpIcon,
  GearIcon,
  GitBranchIcon,
  SquaresFourIcon,
  SunIcon,
  UsersIcon,
  type Icon as PhosphorIcon,
} from "@phosphor-icons/react";

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------
type EventKind = "deploy" | "pr" | "token" | "component" | "member" | "settings";

type ActivityEvent = {
  id: string;
  kind: EventKind;
  actor: string;
  initials: string;
  action: string;
  target: string;
  meta?: string;
  time: string;
  date: string;
  badge: BadgeVariant;
};

const EVENTS: ActivityEvent[] = [
  { id: "1",  kind: "deploy",    actor: "James Howell",   initials: "JH", action: "deployed",       target: "main → Chromatic",              meta: "47 stories",        time: "09:14",  date: "Today",      badge: "success"   },
  { id: "2",  kind: "pr",        actor: "Amara Osei",     initials: "AO", action: "merged",         target: "feat/account-settings-page",    meta: "+312 −18",          time: "08:51",  date: "Today",      badge: "primary"   },
  { id: "3",  kind: "component", actor: "James Howell",   initials: "JH", action: "added",          target: "Tooltip component",             meta: "packages/design-system", time: "08:30", date: "Today",  badge: "secondary" },
  { id: "4",  kind: "token",     actor: "Amara Osei",     initials: "AO", action: "updated",        target: "grey palette → neutral",        meta: "18 semantic tokens", time: "Yesterday, 16:42", date: "Yesterday", badge: "warning" },
  { id: "5",  kind: "pr",        actor: "Lena Fischer",   initials: "LF", action: "opened",         target: "fix/disclosure-collapsed-space",meta: "+8 −2",             time: "Yesterday, 14:10", date: "Yesterday", badge: "default"  },
  { id: "6",  kind: "member",    actor: "James Howell",   initials: "JH", action: "invited",        target: "sofia@example.com",             meta: "Viewer",            time: "Yesterday, 11:05", date: "Yesterday", badge: "default"  },
  { id: "7",  kind: "deploy",    actor: "Carlos Rivera",  initials: "CR", action: "failed deploy",  target: "main → Chromatic",              meta: "3 regressions",     time: "Yesterday, 09:22", date: "Yesterday", badge: "error"    },
  { id: "8",  kind: "component", actor: "Lena Fischer",   initials: "LF", action: "added",          target: "Skeleton component",            meta: "packages/design-system", time: "2 days ago", date: "2 days ago", badge: "secondary" },
  { id: "9",  kind: "settings",  actor: "James Howell",   initials: "JH", action: "changed",        target: "workspace timezone",            meta: "UTC → Europe/London", time: "2 days ago", date: "2 days ago", badge: "default"   },
  { id: "10", kind: "token",     actor: "Amara Osei",     initials: "AO", action: "added",          target: "feedback-warning tokens",       meta: "6 new values",      time: "3 days ago", date: "3 days ago", badge: "warning" },
  { id: "11", kind: "member",    actor: "James Howell",   initials: "JH", action: "removed",        target: "Dan Yates",                     meta: "Editor",            time: "3 days ago", date: "3 days ago", badge: "error"    },
  { id: "12", kind: "pr",        actor: "Carlos Rivera",  initials: "CR", action: "merged",         target: "feat/mobile-nav-fullscreen",    meta: "+58 −46",           time: "4 days ago", date: "4 days ago", badge: "primary"  },
];

const KIND_LABELS: Record<EventKind, string> = {
  deploy: "Deploy", pr: "Pull request", token: "Tokens", component: "Component", member: "Team", settings: "Settings",
};

const KIND_ICONS: Record<EventKind, PhosphorIcon> = {
  deploy: CloudArrowUpIcon,
  pr: GitBranchIcon,
  token: SunIcon,
  component: SquaresFourIcon,
  member: UsersIcon,
  settings: GearIcon,
};

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default function ActivityPage() {
  const [query, setQuery] = useState("");
  const [kindFilter, setKindFilter] = useState("all");
  const [actorFilter, setActorFilter] = useState("all");

  const actors = Array.from(new Set(EVENTS.map((e) => e.actor)));

  const filtered = EVENTS.filter((e) => {
    const q = query.toLowerCase();
    return (
      (q === "" || e.action.includes(q) || e.target.toLowerCase().includes(q) || e.actor.toLowerCase().includes(q)) &&
      (kindFilter === "all" || e.kind === kindFilter) &&
      (actorFilter === "all" || e.actor === actorFilter)
    );
  });

  // Group by date
  const grouped = filtered.reduce<Record<string, ActivityEvent[]>>((acc, e) => {
    (acc[e.date] ??= []).push(e);
    return acc;
  }, {});

  return (
    <div className="p-6 md:p-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground-primary">Activity</h1>
          <p className="text-sm text-foreground-secondary mt-1">Audit log of all workspace events.</p>
        </div>
        <Button variant="secondary" size="sm">
          Export CSV
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <div className="flex-1 min-w-48">
          <SearchField label="Search" placeholder="Search events…" value={query} onChange={setQuery} />
        </div>
        <div className="w-40">
          <Select label="Category" selectedKey={kindFilter} onSelectionChange={(k) => setKindFilter(k as string)}>
            <SelectItem id="all">All categories</SelectItem>
            {(Object.entries(KIND_LABELS) as [EventKind, string][]).map(([k, label]) => (
              <SelectItem key={k} id={k}>{label}</SelectItem>
            ))}
          </Select>
        </div>
        <div className="w-44">
          <Select label="Member" selectedKey={actorFilter} onSelectionChange={(k) => setActorFilter(k as string)}>
            <SelectItem id="all">All members</SelectItem>
            {actors.map((a) => (
              <SelectItem key={a} id={a}>{a}</SelectItem>
            ))}
          </Select>
        </div>
      </div>

      {/* Timeline */}
      {Object.keys(grouped).length === 0 ? (
        <Card classNameOverrides={{ content: "flex flex-col items-center justify-center py-20 text-center p-8" }}>
          <p className="text-base font-medium text-foreground-primary mb-1">No events found</p>
          <p className="text-sm text-foreground-secondary">Try adjusting your filters.</p>
        </Card>
      ) : (
        <div className="flex flex-col gap-6">
          {Object.entries(grouped).map(([date, events]) => (
            <div key={date}>
              <p className="text-xs font-semibold text-foreground-muted uppercase tracking-wider mb-3">{date}</p>
              <Card classNameOverrides={{ content: "p-0" }}>
                <div className="divide-y divide-border-subtle">
                    {events.map((e) => (
                      <div key={e.id} className="flex items-center gap-3 px-4 py-3">
                        {/* Actor avatar */}
                        <TooltipTrigger delay={300}>
                          <button className="shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-interactive-accent rounded-full">
                            <Avatar size="sm">
                              <AvatarFallback>{e.initials}</AvatarFallback>
                            </Avatar>
                          </button>
                          <Tooltip>{e.actor}</Tooltip>
                        </TooltipTrigger>

                        {/* Event description */}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-foreground-primary">
                            <span className="font-medium">{e.actor}</span>{" "}
                            <span className="text-foreground-secondary">{e.action}</span>{" "}
                            <span className="font-mono text-xs bg-surface-muted px-1.5 py-0.5 rounded">{e.target}</span>
                          </p>
                          {e.meta && (
                            <p className="text-xs text-foreground-muted mt-0.5">{e.meta}</p>
                          )}
                        </div>

                        {/* Kind badge */}
                        <div className="flex items-center gap-2 shrink-0">
                          <Badge variant={e.badge} size="sm">
                            <span className="flex items-center gap-1">
                              <Icon icon={KIND_ICONS[e.kind]} size="sm" />
                              {KIND_LABELS[e.kind]}
                            </span>
                          </Badge>
                          <span className="text-xs text-foreground-muted w-16 text-right">{e.time.replace(/.*,\s*/, "")}</span>
                        </div>
                      </div>
                    ))}
                </div>
              </Card>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
