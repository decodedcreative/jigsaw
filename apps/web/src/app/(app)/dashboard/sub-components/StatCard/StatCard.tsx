import { Caption, Card, CardContent, Stat } from "@jigsaw/design-system";
import type { StatCardProps } from "./StatCard.types";

export function StatCard({ label, value, delta, positive }: StatCardProps) {
  return (
    <Card>
      <CardContent padding="lg">
        <Caption classNameOverrides={{ component: ["block", "mb-1"] }}>{label}</Caption>
        <Stat classNameOverrides={{ component: ["mb-2"] }}>{value}</Stat>
        <span
          className={`inline-flex items-center gap-1 text-xs font-medium ${positive ? "text-feedback-success" : "text-feedback-error"}`}
        >
          {positive ? "↑" : "↓"} {delta} vs last month
        </span>
      </CardContent>
    </Card>
  );
}
