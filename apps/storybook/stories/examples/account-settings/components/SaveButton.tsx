import { Button, useToast } from "@jigsaw/design-system";

export const SaveButton = () => {
  const { addToast } = useToast();
  return (
    <Button
      type="submit"
      onPress={() =>
        addToast({ title: "Settings saved", description: "Your changes have been applied.", variant: "success" })
      }
    >
      Save changes
    </Button>
  );
};
