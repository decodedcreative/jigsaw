import {
  Avatar,
  AvatarFallback,
  Badge,
  Card,
  CardContent,
  CardTitle,
} from "@jigsaw/design-system";
import { ACTIVITY, BADGE_VARIANT } from "../../dashboard.constants";

export function ActivityFeed() {
  return (
    <Card>
      <CardContent padding="lg">
        <CardTitle classNameOverrides={{ title: ["mb-4"] }}>Recent activity</CardTitle>
        <div className="divide-y divide-border-subtle">
          {ACTIVITY.map((a) => (
            <div key={a.id} className="flex items-center gap-3 py-3">
              <Avatar size="sm">
                <AvatarFallback>{a.initials}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground-primary">
                  <span className="font-medium">{a.user}</span>{" "}
                  <span className="text-foreground-secondary">{a.action}</span>{" "}
                  <span className="font-mono text-xs bg-surface-muted px-1.5 py-0.5 rounded">
                    {a.target}
                  </span>
                </p>
                <p className="text-xs text-foreground-muted mt-0.5">{a.time}</p>
              </div>
              {a.badge && (
                <Badge variant={BADGE_VARIANT[a.badge]} size="sm">
                  {a.badge}
                </Badge>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
