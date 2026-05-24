"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarStatusIndicator,
  Button,
  Form,
  FormFieldset,
  Input,
  Textarea,
  useToast,
} from "@jigsaw/design-system";
import { PROFILE_DEFAULTS } from "../../settings.constants";

export function ProfileTab() {
  const { addToast } = useToast();

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        addToast({ title: "Profile saved", variant: "success" });
      }}
    >
      <FormFieldset label="Public profile">
        <div className="flex items-center gap-4 mb-2">
          <Avatar size="xl">
            <AvatarFallback>{PROFILE_DEFAULTS.avatarInitials}</AvatarFallback>
            <AvatarStatusIndicator status="online" />
          </Avatar>
          <div className="flex gap-2">
            <Button size="sm">
              Upload photo
            </Button>
            <Button variant="ghost" size="sm">
              Remove
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input label="First name" defaultValue={PROFILE_DEFAULTS.firstName} />
          <Input label="Last name" defaultValue={PROFILE_DEFAULTS.lastName} />
        </div>
        <Input label="Username" defaultValue={PROFILE_DEFAULTS.username} />
        <Input label="Email address" type="email" defaultValue={PROFILE_DEFAULTS.email} />
        <Textarea label="Bio" defaultValue={PROFILE_DEFAULTS.bio} rows={3} />
      </FormFieldset>
      <div className="flex items-center gap-3 mt-6 pt-6 border-t border-border-default">
        <Button>Cancel</Button>
        <Button type="submit" variant="primary">Save changes</Button>
      </div>
    </Form>
  );
}
