"use client";

import { useState } from "react";
import {
  Badge,
  Button,
  H1,
  Detail,
  Notice,
  Subheading,
  Card,
  CardContent,
  Select,
  SelectItem,
} from "@jigsaw/design-system";
import { INITIAL_NOTIFICATIONS } from "../../notifications.constants";
import type { Notification } from "../../notifications.types";
import { NotificationItem } from "../NotificationItem";

export function NotificationFeed() {
  const [items, setItems] = useState<Notification[]>(INITIAL_NOTIFICATIONS);
  const [filter, setFilter] = useState("all");

  const unread = items.filter((n) => !n.read).length;

  const filtered =
    filter === "unread"
      ? items.filter((n) => !n.read)
      : filter === "read"
        ? items.filter((n) => n.read)
        : items;

  const markRead = (id: string) => setItems((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  const markAllRead = () => setItems((prev) => prev.map((n) => ({ ...n, read: true })));
  const dismiss = (id: string) => setItems((prev) => prev.filter((n) => n.id !== id));

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <H1>Notifications</H1>
          {unread > 0 && <Badge variant="primary">{unread}</Badge>}
        </div>
        <Button size="sm" isDisabled={unread === 0} onPress={markAllRead}>
          Mark all as read
        </Button>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="w-36">
          <Select label="Show" value={filter} onChange={(key) => setFilter(key as string)}>
            <SelectItem id="all">All</SelectItem>
            <SelectItem id="unread">Unread</SelectItem>
            <SelectItem id="read">Read</SelectItem>
          </Select>
        </div>
        <Detail as="span">
          {filtered.length} notification{filtered.length !== 1 ? "s" : ""}
        </Detail>
      </div>

      <Card classNameOverrides={{ component: ["mb-6"] }}>
        <CardContent padding="none">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-1 py-16 text-center">
              <Notice>All caught up</Notice>
              <Subheading>No notifications to show.</Subheading>
            </div>
          ) : (
            <div className="divide-y divide-border-subtle">
              {filtered.map((notification) => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                  onMarkRead={markRead}
                  onDismiss={dismiss}
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
}
