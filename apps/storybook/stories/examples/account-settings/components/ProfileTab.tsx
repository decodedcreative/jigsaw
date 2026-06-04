import {
  Avatar,
  Button,
  Form,
  H3,
  Input,
  Textarea,
  toast,
} from "@jigsaw/design-system";

export const ProfileTab = () => (
  <Form onSubmit={(e) => e.preventDefault()}>
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <H3 size="h4">Public profile</H3>
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
      </div>
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
    <div className="flex items-center gap-3 mt-6 pt-6 border-t border-border-default">
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
    </div>
  </Form>
);
