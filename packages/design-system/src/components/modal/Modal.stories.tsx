import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Heading } from "react-aria-components";
import { Modal } from "./Modal";
import { Button } from "../button/Button";

const meta = {
  title: "Design System/Modal",
  component: Modal,
  parameters: {
    layout: "centered",
    docs: {
      // Modal uses a fixed viewport overlay — render in iframes on the docs page
      // so the overlay does not cover props tables and source blocks.
      story: {
        inline: false,
        height: "480px",
      },
      description: {
        component: [
          "`Modal` is a single component driven by props — there are no compound",
          "sub-components to assemble in app code.",
          "",
          "**Chrome goes in props, body goes in `children`:**",
          "- Use the `title` prop for the standard header.",
          "- Use the `footer` prop for action buttons.",
          "- Put the main body in `children`.",
          "- Pass `trigger` for the default uncontrolled open button, or set `isOpen` for controlled usage.",
          "",
          "**Dismissal:** Footer action buttons use `slot=\"close\"` to close after press.",
          "When `footer` is set, `showCancelButton` defaults to `true` so confirmation dialogs get a wired cancel.",
          "Toggle `showCloseButton` and `showCancelButton` to control header and footer cancel affordances.",
          "",
          "**Controlled usage:** Pass both `isOpen` and `onOpenChange`. Setting `isOpen` alone will warn in development.",
          "",
          "**Custom header:** Use the `header` prop instead of `title`. Include a React Aria `Heading` with `slot=\"title\"` so the dialog has an accessible name.",
        ].join("\n"),
      },
    },
  },
  tags: ["autodocs"],
  args: {
    isOpen: true,
  },
  argTypes: {
    cancelLabel: { control: "text" },
    isOpen: { control: "boolean" },
    showCancelButton: { control: "boolean" },
    showCloseButton: { control: "boolean" },
    title: { control: "text" },
    trigger: { control: false },
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Default confirmation layout with header close, wired footer cancel, and a confirm action. Toggle `showCloseButton` or `showCancelButton` when dismissal should live only in the footer.",
      },
    },
  },
  args: {
    title: "Confirm action",
  },
  render: (args) => (
    <Modal
      {...args}
      footer={
        <Button variant="destructive" slot="close">
          Confirm
        </Button>
      }
    >
      <p className="text-sm text-foreground-secondary">
        Are you sure you want to continue? This action cannot be undone.
      </p>
    </Modal>
  ),
};

export const WithConfirmDismiss: Story = {
  parameters: {
    docs: {
      description: {
        story: 'A single confirm button in the footer handles dismissal via `slot="close"`.',
      },
    },
  },
  args: {
    title: "Confirm action",
    showCancelButton: false,
    showCloseButton: false,
  },
  render: (args) => (
    <Modal
      {...args}
      footer={
        <Button variant="destructive" slot="close">
          Confirm
        </Button>
      }
    >
      <p className="text-sm text-foreground-secondary">
        Are you sure you want to continue? This action cannot be undone.
      </p>
    </Modal>
  ),
};

export const WithFooterCancel: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Informational modal with a wired footer cancel button. Set `showCancelButton` when there is no `footer` action.",
      },
    },
  },
  args: {
    title: "Terms updated",
    showCancelButton: true,
  },
  render: (args) => (
    <Modal {...args}>
      <p className="text-sm text-foreground-secondary">
        We have updated our terms of service. Review the changes on the settings page when you are
        ready.
      </p>
    </Modal>
  ),
};

export const WithHeaderClose: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Dismissal via the header close button. Pair with `showCancelButton={false}` when no footer is needed.",
      },
    },
  },
  args: {
    title: "Quick tip",
    showCancelButton: false,
  },
  render: (args) => (
    <Modal {...args}>
      <p className="text-sm text-foreground-secondary">
        Use keyboard shortcuts from the command palette to navigate faster.
      </p>
    </Modal>
  ),
};

export const WithScrollableContent: Story = {
  parameters: {
    docs: {
      description: {
        story: "Long body copy scrolls inside the modal while the header and footer stay fixed.",
      },
    },
  },
  args: {
    title: "Release notes",
  },
  render: (args) => (
    <Modal {...args} footer={<Button slot="close">Got it</Button>}>
      <div className="flex flex-col gap-4 text-sm text-foreground-secondary">
        {Array.from({ length: 12 }, (_, index) => (
          <p key={index}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        ))}
      </div>
    </Modal>
  ),
};

export const Controlled: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Controlled modals require both `isOpen` and `onOpenChange`. Omit `trigger` — open state is owned by the parent.",
      },
    },
  },
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onPress={() => setIsOpen(true)}>Open controlled modal</Button>
        <Modal
          title="Controlled modal"
          isOpen={isOpen}
          onOpenChange={setIsOpen}
          footer={<Button slot="close">Done</Button>}
        >
          <p className="text-sm text-foreground-secondary">
            Parent state drives visibility via `isOpen` and `onOpenChange`.
          </p>
        </Modal>
      </>
    );
  },
};

export const WithCustomHeader: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Replace the default header with `header`. Include `Heading slot=\"title\"` so assistive tech gets a dialog label.",
      },
    },
  },
  args: {
    showCancelButton: false,
  },
  render: (args) => (
    <Modal
      {...args}
      header={
        <div className="flex w-full items-center justify-between">
          <Heading slot="title" className="text-lg font-semibold text-foreground-primary">
            Custom header
          </Heading>
          <span className="text-xs text-foreground-muted">Optional metadata</span>
        </div>
      }
    >
      <p className="text-sm text-foreground-secondary">
        The header region is fully owned by the consumer here.
      </p>
    </Modal>
  ),
};
