import {
  Button,
  Form,
  Select,
  toast,
} from "@jigsaw/design-system";
import { DATE_FORMATS, LANGUAGES, TIMEZONES } from "../AccountSettings.stories.constants";
import { FormFooter } from "./FormFooter";

export const AppearanceTab = () => (
  <Form
    onSubmit={(e) => {
      e.preventDefault();
      toast({
        title: "Settings saved",
        description: "Your changes have been applied.",
        variant: "success",
      });
    }}
  >
    <Form.Group title="Display preferences">
      <Select label="Timezone" defaultValue="utc">
        {TIMEZONES.map((tz) => (
          <Select.Item key={tz.id} id={tz.id}>{tz.label}</Select.Item>
        ))}
      </Select>
      <Select label="Date format" defaultValue="dmy">
        {DATE_FORMATS.map((df) => (
          <Select.Item key={df.id} id={df.id}>{df.label}</Select.Item>
        ))}
      </Select>
      <Select label="Language" defaultValue="en">
        {LANGUAGES.map((lang) => (
          <Select.Item key={lang.id} id={lang.id}>{lang.label}</Select.Item>
        ))}
      </Select>
    </Form.Group>
    <FormFooter>
      <Button variant="secondary">Cancel</Button>
      <Button type="submit">Save changes</Button>
    </FormFooter>
  </Form>
);
