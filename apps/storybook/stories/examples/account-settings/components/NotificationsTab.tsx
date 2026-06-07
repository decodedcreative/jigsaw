import { useState } from "react";
import {
  Button,
  Checkbox,
  CheckboxGroup,
  Form,
  toast,
} from "@jigsaw/design-system";
import { formFooterClassName } from "./formFooter.constants";

const NOTIFICATION_OPTIONS = [
  { value: "digest", label: "Weekly digest", description: "A summary of activity from the past week." },
  { value: "product", label: "Product updates", description: "New features and improvements." },
  { value: "security", label: "Security alerts", description: "Unusual sign-in activity and account changes." },
  { value: "activity", label: "Team activity", description: "Comments, mentions, and assignments." },
] as const;

export const NotificationsTab = () => {
  const [selected, setSelected] = useState<string[]>(["digest", "product", "security"]);

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        toast({ title: "Preferences saved", variant: "success" });
      }}
    >
      <CheckboxGroup label="Email notifications" value={selected} onChange={setSelected}>
        {NOTIFICATION_OPTIONS.map(({ value, label, description }) => (
          <Checkbox key={value} value={value} label={label} description={description} />
        ))}
      </CheckboxGroup>
      <div className={formFooterClassName}>
        <Button variant="secondary">Cancel</Button>
        <Button type="submit">Save changes</Button>
      </div>
    </Form>
  );
};
