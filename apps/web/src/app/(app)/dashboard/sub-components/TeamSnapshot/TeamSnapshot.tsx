import {
  Avatar,
  AvatarFallback,
  AvatarStatusIndicator,
  Card,
  CardContent,
  CardTitle,
} from "@jigsaw/design-system";
import { TEAM } from "../../dashboard.constants";
import { InviteButton } from "./InviteButton";

export function TeamSnapshot() {
  return (
    <Card>
      <CardContent padding="lg">
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
                <p className="text-sm font-medium text-foreground-primary leading-tight">{m.name}</p>
                <p className="text-xs text-foreground-secondary">{m.role}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
