import type { Meta, StoryObj } from "@storybook/react";
import { expect, screen, waitFor } from "storybook/test";
import { useEffect, useRef } from "react";
import { BellIcon } from "@phosphor-icons/react";
import { ToastRegion, toastPositions, toastVariants, toast } from "./index";
import type { ToastPosition } from "./Toast.types";
import { Button } from "../button/Button";
import { TEST_ONLY_PARAMETERS } from "../../test-utils/story-play";

const meta = {
  title: "Design System/Toast",
  component: ToastRegion,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Mount one or more `<ToastRegion region=\"…\" />` at your app root, then call `toast()` from anywhere. " +
          "Each region id gets its own queue — use matching `region` values on both the component and `toast()` calls. " +
          "Prefer a fixed set of region ids (see `ToastRegionId`); queues are not garbage-collected. " +
          "Built on React Aria `UNSTABLE_*` Toast primitives — upgrade imports in `toast.queue.ts` when Adobe stabilises the API.",
      },
    },
  },
  tags: ["autodocs"],
  args: {
    position: "bottom-right",
  },
  argTypes: {
    region: {
      control: "text",
      description: "Queue id — must match `region` passed to `toast()`.",
    },
    position: {
      control: "select",
      options: toastPositions,
      description: "Fixed viewport corner or edge for the toast stack.",
    },
    classNameOverrides: { control: false },
  },
} satisfies Meta<typeof ToastRegion>;

export default meta;
type Story = StoryObj<typeof meta>;

const Trigger = () => (
  <div className="flex flex-wrap gap-2">
    <Button
      variant="primary"
      onPress={() =>
        toast({ title: "Saved", description: "Your changes are saved.", variant: "success" })
      }
    >
      Success
    </Button>
    <Button
      variant="destructive"
      onPress={() =>
        toast({ title: "Error", description: "Something went wrong.", variant: "error" })
      }
    >
      Error
    </Button>
  </div>
);

const DEFAULT_SOURCE = `import { Button, ToastRegion, toast } from "@jigsaw-ds/design-system";

// Once, at your app root:
<ToastRegion position="bottom-right" />

// Anywhere in your app:
<Button
  variant="primary"
  onPress={() => toast({ title: "Saved", description: "Your changes are saved.", variant: "success" })}
>
  Success
</Button>
<Button
  variant="destructive"
  onPress={() => toast({ title: "Error", description: "Something went wrong.", variant: "error" })}
>
  Error
</Button>`;

export const Default: Story = {
  parameters: {
    // Trigger is only a row of buttons calling toast(); show the real pattern.
    docs: { source: { code: DEFAULT_SOURCE, language: "tsx" } },
  },
  render: (args) => (
    <>
      <Trigger />
      <ToastRegion {...args} />
    </>
  ),
};

const VariantTrigger = () => (
  <div className="flex flex-wrap gap-2">
    {toastVariants.map((variant) => (
      <Button
        key={variant}
        variant={variant === "error" ? "destructive" : variant === "success" ? "primary" : "secondary"}
        onPress={() =>
          toast({
            title: variant.charAt(0).toUpperCase() + variant.slice(1),
            description: `variant="${variant}"`,
            variant,
            duration: 0,
          })
        }
      >
        {variant}
      </Button>
    ))}
    <Button
      variant="outline"
      onPress={() =>
        toast({
          title: "Custom icon",
          description: 'icon={BellIcon} with variant="info"',
          variant: "info",
          icon: BellIcon,
          duration: 0,
        })
      }
    >
      Custom icon
    </Button>
  </div>
);

const VARIANTS_SOURCE = `import { BellIcon } from "@phosphor-icons/react/Bell";
import { ToastRegion, toast } from "@jigsaw-ds/design-system";

<ToastRegion />

toast({ title: "Default", description: 'Leaving out variant uses "default".' });
toast({ title: "Info", description: "Something happened.", variant: "info" });
toast({ title: "Success", description: "Your changes are saved.", variant: "success" });
toast({ title: "Warning", description: "Check before continuing.", variant: "warning" });
toast({ title: "Error", description: "Something went wrong.", variant: "error" });

// Keep the variant colours but swap the icon:
toast({ title: "Custom icon", variant: "info", icon: BellIcon });

// duration: 0 keeps a toast until it's dismissed.
toast({ title: "Pinned", variant: "info", duration: 0 });`;

export const Variants: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story:
          "Each variant uses a default Phosphor icon. Pass `icon` to `toast()` to override while keeping variant colours.",
      },
      source: { code: VARIANTS_SOURCE, language: "tsx" },
    },
  },
  render: (args) => (
    <>
      <VariantTrigger />
      <ToastRegion {...args} />
    </>
  ),
};

/** Shows a sample toast on mount; change **position** in Controls to move the viewport. */
function PositionPreview({ position }: { position: ToastPosition }) {
  const toastCount = useRef(0);

  useEffect(() => {
    toastCount.current = 1;
    toast({
      title: `Toast 1`,
      description: `Position: ${position}. Newest sits on the anchored edge.`,
      variant: "info",
      duration: 0,
    });
  }, [position]);

  return (
    <Button
      variant="secondary"
      onPress={() => {
        toastCount.current += 1;
        const n = toastCount.current;
        toast({
          title: `Toast ${n}`,
          description: `Position: ${position}. Close removes only this toast.`,
          duration: 0,
        });
      }}
    >
      Add toast
    </Button>
  );
}

const POSITION_SOURCE = `import { ToastRegion, toast } from "@jigsaw-ds/design-system";

// position: "top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right"
<ToastRegion position="top-right" />

toast({ title: "Toast 1", description: "Newest sits on the anchored edge.", variant: "info" });`;

export const Position: Story = {
  args: {},
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        story:
          "Interactive viewport placement. Pick a **position** in Controls — the region remounts and shows a sample toast at that corner. Use **Add toast** to stack more.",
      },
      source: { code: POSITION_SOURCE, language: "tsx" },
    },
  },
  render: (args) => (
    <div className="flex min-h-128 flex-col bg-surface-default p-8">
      <div className="min-h-28 shrink-0" aria-hidden />
      <div className="mt-auto flex flex-col gap-4">
        <p className="max-w-md text-sm text-foreground-secondary">
          Toasts render in a fixed viewport. Change <strong>position</strong> in the Storybook
          controls to preview each placement.
        </p>
        <PositionPreview position={args.position ?? "bottom-right"} />
        <ToastRegion key={args.position} {...args} />
      </div>
    </div>
  ),
};

export const MultipleRegions: Story = {
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        story:
          "Mount multiple regions with different `region` ids and `position` values. " +
          "Route toasts with `toast({ title }, { region: \"top\" })` or `toast({ title, region: \"bottom\" })`.",
      },
    },
  },
  render: () => (
    <div className="flex min-h-128 flex-col items-center justify-center gap-4 bg-surface-default p-8">
      <p className="max-w-md text-center text-sm text-foreground-secondary">
        Two independent queues — top-right for messages, bottom-right for actions.
      </p>
      <div className="flex flex-wrap justify-center gap-2">
        <Button
          variant="secondary"
          onPress={() =>
            toast({ title: "New message", description: "From Alex in #design." }, { region: "top", duration: 0 })
          }
        >
          Top region
        </Button>
        <Button
          variant="primary"
          onPress={() =>
            toast({ title: "Upload complete", variant: "success" }, { region: "bottom", duration: 0 })
          }
        >
          Bottom region
        </Button>
      </div>
      <ToastRegion region="top" position="top-right" />
      <ToastRegion region="bottom" position="bottom-right" />
    </div>
  ),
};

/** Test-only: showing a toast changes the story, so the keyboard flow runs here. */
export const KeyboardTest: Story = {
  tags: ["!dev", "!autodocs"],
  parameters: TEST_ONLY_PARAMETERS,
  args: { region: "keyboard-test", "aria-label": "Test notifications" },
  render: (args) => (
    <>
      <Button
        onPress={() =>
          toast({ title: "Saved", description: "Your changes are saved.", region: "keyboard-test", duration: 0 })
        }
      >
        Save
      </Button>
      <ToastRegion {...args} />
    </>
  ),
  play: async ({ canvas, userEvent, step }) => {
    const trigger = canvas.getByRole("button", { name: "Save" });

    await step("Enter on the trigger shows a toast without moving focus", async () => {
      await userEvent.tab();
      await userEvent.keyboard("{Enter}");
      await expect(await screen.findByText("Your changes are saved.")).toBeVisible();
      await expect(trigger).toHaveFocus();
    });

    await step("Tab reaches the toast's Close button, and Enter dismisses the toast", async () => {
      const close = screen.getByRole("button", { name: "Close" });
      for (let i = 0; i < 3 && document.activeElement !== close; i++) await userEvent.tab();
      await expect(close).toHaveFocus();
      await userEvent.keyboard("{Enter}");
      await waitFor(() => expect(screen.queryByText("Your changes are saved.")).toBeNull());
    });
  },
};
