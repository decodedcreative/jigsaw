"use client";

import { ArrowsClockwiseIcon, ArrowSquareOutIcon, PlayIcon } from "@phosphor-icons/react";
import {
  Button,
  Card,
  CardContent,
  CardTitle,
  Icon,
  useToast,
} from "@jigsaw/design-system";

export function QuickActions() {
  const { addToast } = useToast();

  return (
    <Card>
      <CardContent padding="lg">
        <CardTitle classNameOverrides={{ title: ["mb-4"] }}>Quick actions</CardTitle>
        <div className="flex flex-col gap-2">
          <Button
            fullWidth
            media={<Icon icon={PlayIcon} weight="fill" />}
            onPress={() =>
              addToast({
                title: "Build triggered",
                description: "Storybook deploying to Chromatic.",
                variant: "info",
              })
            }
          >
            Trigger Storybook build
          </Button>
          <Button
            fullWidth
            media={<Icon icon={ArrowsClockwiseIcon} />}
            onPress={() => addToast({ title: "Tokens rebuilt", variant: "success" })}
          >
            Rebuild design tokens
          </Button>
          <Button
            fullWidth
            media={<Icon icon={ArrowSquareOutIcon} />}
          >
            Open Storybook
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
