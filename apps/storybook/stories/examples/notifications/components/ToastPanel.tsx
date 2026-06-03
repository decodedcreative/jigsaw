import {
  Button,
  Card,
  Text,
  toast,
} from "@jigsaw/design-system";
import { TOAST_EXAMPLES } from "../Notifications.stories.constants";

export const ToastPanel = () => (
  <Card classNameOverrides={{ content: "p-6" }}>
    <div className="mb-4">
      <Text size="base" weight="semibold">
        Toast notifications
      </Text>
      <Text size="sm" classNameOverrides={{ component: "text-foreground-secondary mt-1" }}>
        Posted to the default region (bottom-right). See Design System / Toast → Multiple regions
        for independent viewports.
      </Text>
    </div>
    <div className="flex flex-wrap gap-2">
      {TOAST_EXAMPLES.map((t) => (
        <Button
          key={t.label}
          variant="secondary"
          size="sm"
          onPress={() =>
            toast({
              title: t.title,
              description: t.description,
              variant: t.variant,
              ...(t.label === "With action"
                ? { action: { label: "Undo", onClick: () => toast({ title: "Message restored", variant: "success" }) } }
                : {}),
            })
          }
        >
          {t.label}
        </Button>
      ))}
      <Button
        size="sm"
        variant="secondary"
        onPress={() => {
          toast({ title: "Step 1 of 3 complete", variant: "info" });
          setTimeout(() => toast({ title: "Step 2 of 3 complete", variant: "info" }), 800);
          setTimeout(() => toast({ title: "All done!", variant: "success" }), 1600);
        }}
      >
        Sequence
      </Button>
    </div>
  </Card>
);
