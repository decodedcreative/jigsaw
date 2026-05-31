import { useState } from "react";
import { Badge, Button, Card, Text } from "@jigsaw/design-system";
import { FEED, TYPE_COLOR, TYPE_ICON } from "../Notifications.stories.constants";

export const NotificationFeed = () => {
  const [items, setItems] = useState(FEED);
  const unread = items.filter((n) => !n.read).length;

  const markAllRead = () => setItems((prev) => prev.map((n) => ({ ...n, read: true })));
  const markRead = (id: string) => setItems((prev) => prev.map((n) => n.id === id ? { ...n, read: true } : n));

  return (
    <Card classNameOverrides={{ content: "p-6" }}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Text size="base" weight="semibold">Notifications</Text>
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
                <Text size="sm" weight={n.read ? "normal" : "medium"} className={n.read ? "text-foreground-secondary" : undefined}>{n.title}</Text>
                <Text size="xs" className="text-foreground-secondary truncate block">{n.body}</Text>
                <Text size="xs" muted className="mt-0.5">{n.time}</Text>
              </div>
            </button>
          ))}
        </div>
    </Card>
  );
};
