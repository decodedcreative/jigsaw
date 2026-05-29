import { useState } from "react";
import {
  Button,
  Card,
  Select,
  SelectItem,
  Text,
  useToast,
} from "@jigsaw/design-system";
import { TOAST_EXAMPLES } from "../Notifications.stories.constants";

export const ToastPanel = () => {
  const { addToast } = useToast();
  const [position, setPosition] = useState<string>("bottom-right");

  return (
    <Card classNameOverrides={{ content: "p-6" }}>
        <div className="flex items-center justify-between mb-4">
          <Text size="base" weight="semibold">Toast notifications</Text>
          <div className="w-48">
            <Select
              label="Position"
              selectedKey={position}
              onSelectionChange={(k) => setPosition(k as string)}
            >
              <SelectItem id="top-left">Top left</SelectItem>
              <SelectItem id="top-center">Top centre</SelectItem>
              <SelectItem id="top-right">Top right</SelectItem>
              <SelectItem id="bottom-left">Bottom left</SelectItem>
              <SelectItem id="bottom-center">Bottom centre</SelectItem>
              <SelectItem id="bottom-right">Bottom right</SelectItem>
            </Select>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {TOAST_EXAMPLES.map((t) => (
            <Button
              key={t.label}
              variant="secondary"
              size="sm"
              onPress={() =>
                addToast({
                  title: t.title,
                  description: t.description,
                  variant: t.variant,
                  ...(t.label === "With action"
                    ? { action: { label: "Undo", onClick: () => addToast({ title: "Message restored", variant: "success" }) } }
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
              addToast({ title: "Step 1 of 3 complete", variant: "info" });
              setTimeout(() => addToast({ title: "Step 2 of 3 complete", variant: "info" }), 800);
              setTimeout(() => addToast({ title: "All done!", variant: "success" }), 1600);
            }}
          >
            Sequence
          </Button>
        </div>
    </Card>
  );
};
