import type { Meta, StoryObj } from "@storybook/react";
import { useEffect, useRef } from "react";
import { BellIcon } from "@phosphor-icons/react";
import { ToastProvider, useToast } from "./index";
import type { ToastPosition, ToastVariant } from "./Toast.styles";
import { Button } from "../button/Button";

const toastVariants: ToastVariant[] = [
  "default",
  "success",
  "warning",
  "error",
  "info",
];

const toastPositions: ToastPosition[] = [
  "top-left",
  "top-center",
  "top-right",
  "bottom-left",
  "bottom-center",
  "bottom-right",
];

const meta = {
  title: "Design System/Toast",
  component: ToastProvider,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Wrap your app in `ToastProvider`, then call `useToast().addToast()` from any child. Use the **Position** story to preview viewport placement.",
      },
    },
  },
  tags: ["autodocs"],
  args: {
    position: "bottom-right",
  },
  argTypes: {
    position: {
      control: "select",
      options: toastPositions,
      description: "Fixed viewport corner or edge for the toast stack.",
    },
    children: { control: false },
    classNameOverrides: { control: false },
  },
} satisfies Meta<typeof ToastProvider>;

export default meta;
type Story = StoryObj<typeof meta>;

const Trigger = () => {
  const { addToast } = useToast();
  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant="primary"
        onPress={() =>
          addToast({ title: "Saved", description: "Your changes are saved.", variant: "success" })
        }
      >
        Success
      </Button>
      <Button
        variant="destructive"
        onPress={() =>
          addToast({ title: "Error", description: "Something went wrong.", variant: "error" })
        }
      >
        Error
      </Button>
    </div>
  );
};

export const Default: Story = {
  render: (args) => (
    <ToastProvider {...args}>
      <Trigger />
    </ToastProvider>
  ),
};

const VariantTrigger = () => {
  const { addToast } = useToast();
  return (
    <div className="flex flex-wrap gap-2">
      {toastVariants.map((variant) => (
        <Button
          key={variant}
          variant={variant === "error" ? "destructive" : variant === "success" ? "primary" : "secondary"}
          onPress={() =>
            addToast({
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
          addToast({
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
};

export const Variants: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Each variant uses a default Phosphor icon. Pass `icon` to `addToast` to override while keeping variant colours.",
      },
    },
  },
  render: (args) => (
    <ToastProvider {...args}>
      <VariantTrigger />
    </ToastProvider>
  ),
};

/** Shows a sample toast on mount; change **position** in Controls to move the viewport. */
function PositionPreview({ position }: { position: ToastPosition }) {
  const { addToast } = useToast();
  const toastCount = useRef(0);

  useEffect(() => {
    toastCount.current = 1;
    addToast({
      title: `Toast 1`,
      description: `Position: ${position}. Newest sits on the anchored edge.`,
      variant: "info",
      duration: 0,
    });
  }, [addToast, position]);

  return (
    <Button
      variant="secondary"
      onPress={() => {
        toastCount.current += 1;
        const n = toastCount.current;
        addToast({
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

export const Position: Story = {
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        story:
          "Interactive viewport placement. Pick a **position** in Controls — the provider remounts and shows a sample toast at that corner. Use **Add toast** to stack more.",
      },
    },
  },
  render: (args) => (
    <div className="flex min-h-[32rem] flex-col bg-surface-default p-8">
      {/* Reserve space so top-positioned toasts do not cover the demo copy */}
      <div className="min-h-28 shrink-0" aria-hidden />
      <div className="mt-auto flex flex-col gap-4">
        <p className="max-w-md text-sm text-foreground-secondary">
          Toasts render in a fixed viewport. Change <strong>position</strong> in the Storybook
          controls to preview each placement.
        </p>
        <ToastProvider key={args.position} {...args}>
          <PositionPreview position={args.position ?? "bottom-right"} />
        </ToastProvider>
      </div>
    </div>
  ),
};
