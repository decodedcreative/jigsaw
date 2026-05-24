"use client";

import { useState } from "react";
import {
  Button,
  Checkbox,
  Form,
  FormFieldset,
  useToast,
} from "@jigsaw/design-system";
import { DEFAULT_NOTIFICATION_PREFS, NOTIFICATION_PREF_OPTIONS } from "../../settings.constants";
import type { NotificationPrefKey, NotificationPrefs } from "../../settings.types";

export function NotificationsTab() {
  const { addToast } = useToast();
  const [prefs, setPrefs] = useState<NotificationPrefs>(DEFAULT_NOTIFICATION_PREFS);

  const toggle = (key: NotificationPrefKey) => (value: boolean) =>
    setPrefs((p) => ({ ...p, [key]: value }));

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        addToast({ title: "Preferences saved", variant: "success" });
      }}
    >
      <FormFieldset label="Email notifications">
        <div className="flex flex-col gap-4">
          {NOTIFICATION_PREF_OPTIONS.map(({ key, label, desc }) => (
            <Checkbox key={key} isSelected={prefs[key]} onChange={toggle(key)}>
              <span className="font-medium">{label}</span>
              <span className="block text-xs text-foreground-secondary">{desc}</span>
            </Checkbox>
          ))}
        </div>
      </FormFieldset>
      <div className="flex items-center gap-3 mt-6 pt-6 border-t border-border-default">
        <Button>Cancel</Button>
        <Button type="submit" variant="primary">Save changes</Button>
      </div>
    </Form>
  );
}
