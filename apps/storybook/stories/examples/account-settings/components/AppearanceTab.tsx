import {
  Button,
  Form,
  FormActions,
  FormFieldset,
  Select,
  SelectItem,
  toast,
} from "@jigsaw/design-system";
import { DATE_FORMATS, LANGUAGES, TIMEZONES } from "../AccountSettings.stories.constants";

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
        <Button
          onPress={() =>
            toast({
              title: "Settings saved",
              description: "Your changes have been applied.",
              variant: "success",
            })
          }
        >
          Save changes
        </Button>
      </FormActions>
    </Form>
);
