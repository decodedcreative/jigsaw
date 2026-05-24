"use client";

import {
  Button,
  Form,
  FormFieldset,
  Select,
  SelectItem,
  useToast,
} from "@jigsaw/design-system";
import { DATE_FORMAT_OPTIONS, LANGUAGE_OPTIONS, TIMEZONE_OPTIONS } from "../../settings.constants";

export function AppearanceTab() {
  const { addToast } = useToast();

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        addToast({ title: "Preferences saved", variant: "success" });
      }}
    >
      <FormFieldset label="Display preferences">
        <Select label="Timezone" defaultValue="utc">
          {TIMEZONE_OPTIONS.map(({ id, label }) => (
            <SelectItem key={id} id={id}>
              {label}
            </SelectItem>
          ))}
        </Select>
        <Select label="Date format" defaultValue="dmy">
          {DATE_FORMAT_OPTIONS.map(({ id, label }) => (
            <SelectItem key={id} id={id}>
              {label}
            </SelectItem>
          ))}
        </Select>
        <Select label="Language" defaultValue="en">
          {LANGUAGE_OPTIONS.map(({ id, label }) => (
            <SelectItem key={id} id={id}>
              {label}
            </SelectItem>
          ))}
        </Select>
      </FormFieldset>
      <div className="flex items-center gap-3 mt-6 pt-6 border-t border-border-default">
        <Button>Cancel</Button>
        <Button type="submit" variant="primary">Save changes</Button>
      </div>
    </Form>
  );
}
