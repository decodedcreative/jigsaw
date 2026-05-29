import {
  Button,
  Form,
  FormActions,
  FormFieldset,
  Select,
  SelectItem,
} from "@jigsaw/design-system";
import { DATE_FORMATS, LANGUAGES, TIMEZONES } from "../AccountSettings.stories.constants";
import { SaveButton } from "./SaveButton";

export const AppearanceTab = () => (
    <Form onSubmit={(e) => e.preventDefault()}>
      <FormFieldset legend="Display preferences">
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
      </FormFieldset>
      <FormActions>
        <Button variant="secondary">Cancel</Button>
        <SaveButton />
      </FormActions>
    </Form>
);
