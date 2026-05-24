"use client";

import { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  Checkbox,
  Disclosure,
  DisclosureGroup,
  useToast,
} from "@jigsaw/design-system";
import { DEFAULT_PREFERENCES, PREFERENCE_OPTIONS } from "../../notifications.constants";
import type { PrefKey } from "../../notifications.types";

export function Preferences() {
  const { addToast } = useToast();
  const [prefs, setPrefs] = useState(DEFAULT_PREFERENCES);

  const toggle = (key: PrefKey) => (value: boolean) => setPrefs((p) => ({ ...p, [key]: value }));

  return (
    <Card>
      <CardContent padding="lg">
        <DisclosureGroup>
          <Disclosure title="Email preferences">
            <div className="flex flex-col gap-3 mt-2">
              {PREFERENCE_OPTIONS.map(({ key, label, desc }) => (
                <Checkbox key={key} isSelected={prefs[key]} onChange={toggle(key)}>
                  <span className="font-medium">{label}</span>
                  <span className="block text-xs text-foreground-secondary">{desc}</span>
                </Checkbox>
              ))}
              <div className="pt-2">
                <Button variant="primary" size="sm" onPress={() => addToast({ title: "Preferences saved", variant: "success" })}>
                  Save preferences
                </Button>
              </div>
            </div>
          </Disclosure>
        </DisclosureGroup>
      </CardContent>
    </Card>
  );
}
