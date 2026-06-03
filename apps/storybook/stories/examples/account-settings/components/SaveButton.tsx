import { Button, toast } from "@jigsaw/design-system";

export const SaveButton = () => (
  <Button
    onPress={() =>
      toast({ title: "Settings saved", description: "Your changes have been applied.", variant: "success" })
    }
  >
    Save changes
  </Button>
);
