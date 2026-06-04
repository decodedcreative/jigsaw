import { useState } from "react";
import {
  Button,
  Checkbox,
  CheckboxGroup,
  Form,
  FormGroup,
  toast,
} from "@jigsaw/design-system";

const NOTIFICATION_OPTIONS = [
  { value: "digest", label: "Weekly digest", description: "A summary of activity from the past week." },
  { value: "product", label: "Product updates", description: "New features and improvements." },
  { value: "security", label: "Security alerts", description: "Unusual sign-in activity and account changes." },
  { value: "activity", label: "Team activity", description: "Comments, mentions, and assignments." },
] as const;

export const NotificationsTab = () => {
  const [selected, setSelected] = useState<string[]>(["digest", "product", "security"]);

  return (
    <Form onSubmit={(e) => e.preventDefault()}>
      <FormGroup title="Email notifications">
        <CheckboxGroup value={selected} onChange={setSelected}>
          {NOTIFICATION_OPTIONS.map(({ value, label, description }) => (
            <Checkbox key={value} value={value} label={label} description={description} />
          ))}
        </CheckboxGroup>
      </FormGroup>
      <div className="flex items-center gap-3 mt-6 pt-6 border-t border-border-default">
        <Button variant="secondary">Cancel</Button>
        <Button onPress={() => toast({ title: "Preferences saved", variant: "success" })}>
          Save changes
        </Button>
      </div>
    </Form>
  );
};
