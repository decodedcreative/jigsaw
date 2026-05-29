import { useState } from "react";
import {
  Button,
  Checkbox,
  Form,
  FormActions,
  FormFieldset,
  useToast,
} from "@jigsaw/design-system";

export const NotificationsTab = () => {
  const [emailDigest, setEmailDigest] = useState(true);
  const [productUpdates, setProductUpdates] = useState(true);
  const [securityAlerts, setSecurityAlerts] = useState(true);
  const [teamActivity, setTeamActivity] = useState(false);

  const { addToast } = useToast();

  return (
    <Form onSubmit={(e) => e.preventDefault()}>
      <FormFieldset legend="Email notifications">
        <div className="flex flex-col gap-3">
          <Checkbox isSelected={emailDigest} onChange={setEmailDigest}>
            <span className="font-medium">Weekly digest</span>
            <span className="block text-xs text-text-secondary">A summary of activity from the past week.</span>
          </Checkbox>
          <Checkbox isSelected={productUpdates} onChange={setProductUpdates}>
            <span className="font-medium">Product updates</span>
            <span className="block text-xs text-text-secondary">New features and improvements.</span>
          </Checkbox>
          <Checkbox isSelected={securityAlerts} onChange={setSecurityAlerts}>
            <span className="font-medium">Security alerts</span>
            <span className="block text-xs text-text-secondary">Unusual sign-in activity and account changes.</span>
          </Checkbox>
          <Checkbox isSelected={teamActivity} onChange={setTeamActivity}>
            <span className="font-medium">Team activity</span>
            <span className="block text-xs text-text-secondary">Comments, mentions, and assignments.</span>
          </Checkbox>
        </div>
      </FormFieldset>
      <FormActions>
        <Button variant="secondary">Cancel</Button>
        <Button
          onPress={() =>
            addToast({ title: "Preferences saved", variant: "success" })
          }
        >
          Save changes
        </Button>
      </FormActions>
    </Form>
  );
};
