"use client";

import { useState } from "react";
import {
  Avatar,
  AvatarFallback,
  Badge,
  Button,
  H1,
  Card,
  CardContent,
  Detail,
  Icon,
  Notice,
  SectionLabel,
  SearchField,
  Select,
  SelectItem,
  Subheading,
  Tooltip,
  TooltipTrigger,
} from "@jigsaw/design-system";
import { EVENTS, KIND_ICONS, KIND_LABELS } from "./activity.constants";
import type { ActivityEvent, EventKind } from "./activity.types";

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

  const grouped = filtered.reduce<Record<string, ActivityEvent[]>>((acc, e) => {
    (acc[e.date] ??= []).push(e);
    return acc;
  }, {});

  return (
    <div className="p-6 md:p-8 max-w-4xl mx-auto">
      <div className="flex items-start justify-between mb-8">
        <div className="flex flex-col gap-1">
          <H1>Activity</H1>
          <Subheading>Audit log of all workspace events.</Subheading>
        </div>
        <Button size="sm">
          Export CSV
        </Button>
      </div>

      <div className="flex flex-wrap gap-3 mb-6">
        <div className="flex-1 min-w-48">
          <SearchField label="Search" placeholder="Search events…" value={query} onChange={setQuery} />
        </div>
        <div className="w-40">
          <Select label="Category" value={kindFilter} onChange={(k) => setKindFilter(k as string)}>
            <SelectItem id="all">All categories</SelectItem>
            {(Object.entries(KIND_LABELS) as [EventKind, string][]).map(([k, label]) => (
              <SelectItem key={k} id={k}>{label}</SelectItem>
            ))}
          </Select>
        </div>
        <div className="w-44">
          <Select label="Member" value={actorFilter} onChange={(k) => setActorFilter(k as string)}>
            <SelectItem id="all">All members</SelectItem>
            {actors.map((a) => (
              <SelectItem key={a} id={a}>{a}</SelectItem>
            ))}
          </Select>
        </div>
      </div>

      {Object.keys(grouped).length === 0 ? (
        <Card>
          <CardContent
            padding="lg"
            classNameOverrides={{ content: ["flex", "flex-col", "items-center", "justify-center", "gap-1", "py-20", "text-center"] }}
          >
            <Notice>No events found</Notice>
            <Subheading>Try adjusting your filters.</Subheading>
          </CardContent>
        </Card>
      ) : (
        <div className="flex flex-col gap-6">
          {Object.entries(grouped).map(([date, events]) => (
            <div key={date}>
              <SectionLabel classNameOverrides={{ component: ["mb-3"] }}>{date}</SectionLabel>
              <Card>
                <CardContent padding="none">
                  <div className="divide-y divide-border-subtle">
                    {events.map((e) => (
                      <div key={e.id} className="flex items-center gap-3 px-4 py-3">
                        <TooltipTrigger delay={300}>
                          <Button
                            variant="ghost"
                            mediaOnly
                            aria-label={e.actor}
                            media={
                              <Avatar size="sm">
                                <AvatarFallback>{e.initials}</AvatarFallback>
                              </Avatar>
                            }
                          />
                          <Tooltip>{e.actor}</Tooltip>
                        </TooltipTrigger>

                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-foreground-primary">
                            <span className="font-medium">{e.actor}</span>{" "}
                            <span className="text-foreground-secondary">{e.action}</span>{" "}
                            <span className="font-mono text-xs bg-surface-muted px-1.5 py-0.5 rounded">{e.target}</span>
                          </p>
                          {e.meta && (
                            <Detail classNameOverrides={{ component: ["mt-0.5"] }}>{e.meta}</Detail>
                          )}
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <Badge variant={e.badge} size="sm">
                            <span className="flex items-center gap-1">
                              <Icon icon={KIND_ICONS[e.kind]} size="sm" />
                              {KIND_LABELS[e.kind]}
                            </span>
                          </Badge>
                          <Detail as="span" classNameOverrides={{ component: ["w-16", "text-right"] }}>
                            {e.time.replace(/.*,\s*/, "")}
                          </Detail>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
