import {
  Avatar,
  Button,
  Form,
  FormGroup,
  Input,
  Textarea,
  toast,
} from "@jigsaw/design-system";
import { FormFooter } from "./FormFooter";

export const ProfileTab = () => (
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
    <div className="flex flex-col gap-6">
      <FormGroup title="Public profile">
        <div className="flex items-center gap-4">
          <Avatar size="xl" initials="JH" status="online" />
          <div className="flex gap-2">
            <Button variant="secondary" size="sm">
              Upload photo
            </Button>
            <Button variant="ghost" size="sm">
              Remove
            </Button>
          </div>
        </div>
      </FormGroup>
      {/* RAC fields own their labels — separate stack, no section wrapper */}
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-4">
          <Input label="First name" defaultValue="James" />
          <Input label="Last name" defaultValue="Howell" />
        </div>
        <Input label="Username" defaultValue="jameshowell" />
        <Input label="Email address" type="email" defaultValue="james@example.com" />
        <Textarea label="Bio" defaultValue="Building design systems." rows={3} />
      </div>
    </div>
    <FormFooter>
      <Button variant="secondary">Cancel</Button>
      <Button type="submit">Save changes</Button>
    </FormFooter>
  </Form>
);
