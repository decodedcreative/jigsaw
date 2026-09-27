import { useState } from "react";
import { Badge, Button, Card, Text } from "@jigsaw-ds/design-system";
import { FEED, TYPE_COLOR } from "../Notifications.stories.constants";
import { NotificationTypeIcon } from "./NotificationTypeIcon";

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
            <Button
              key={n.id}
              variant="ghost"
              classNameOverrides={{
                component:
                  "h-auto w-full justify-start rounded-md px-2 py-3 text-left font-normal",
                text: "flex w-full min-w-0 items-start gap-3",
              }}
              onPress={() => markRead(n.id)}
            >
              <div className="flex h-8 w-2 shrink-0 items-center justify-center">
                {!n.read && <div className="h-2 w-2 rounded-full bg-interactive-accent" />}
              </div>
              <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${TYPE_COLOR[n.type]}`}>
                <NotificationTypeIcon type={n.type} />
              </div>
              <div className="flex min-w-0 flex-1 flex-col items-start">
                <Text
                  as="span"
                  size="sm"
                  weight={n.read ? "normal" : "medium"}
                  classNameOverrides={{
                    component: n.read ? "text-foreground-secondary" : "text-foreground-primary",
                  }}
                >
                  {n.title}
                </Text>
                <Text
                  as="span"
                  size="xs"
                  classNameOverrides={{ component: "max-w-full truncate text-foreground-secondary" }}
                >
                  {n.body}
                </Text>
                <Text as="span" size="xs" muted classNameOverrides={{ component: "mt-0.5" }}>
                  {n.time}
                </Text>
              </div>
            </Button>
          ))}
        </div>
    </Card>
  );
};
