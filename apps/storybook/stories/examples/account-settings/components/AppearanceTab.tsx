import {
  Button,
  Form,
  Select,
  SelectItem,
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
      <Select label="Timezone" defaultSelectedKey="utc">
        {TIMEZONES.map((tz) => (
          <SelectItem key={tz.id} id={tz.id}>{tz.label}</SelectItem>
        ))}
      </Select>
      <Select label="Date format" defaultSelectedKey="dmy">
        {DATE_FORMATS.map((df) => (
          <SelectItem key={df.id} id={df.id}>{df.label}</SelectItem>
        ))}
      </Select>
      <Select label="Language" defaultSelectedKey="en">
        {LANGUAGES.map((lang) => (
          <SelectItem key={lang.id} id={lang.id}>{lang.label}</SelectItem>
        ))}
      </Select>
    </Form.Group>
    <FormFooter>
      <Button variant="secondary">Cancel</Button>
      <Button type="submit">Save changes</Button>
    </FormFooter>
  </Form>
);
