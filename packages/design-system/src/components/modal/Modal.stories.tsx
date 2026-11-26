import type { Meta, StoryObj } from "@storybook/react";
import { expect, screen, waitFor } from "storybook/test";
import { useEffect, useState } from "react";
import { Heading } from "react-aria-components";
import { Modal } from "./Modal";
import type { ModalProps } from "./Modal.types";
import { Button } from "../button/Button";
import { TEST_ONLY_PARAMETERS } from "../../test-utils/story-play";

/** Docs stories open by default with controlled open state wired for Storybook. */
function ModalStory(props: ModalProps) {
  const { isOpen: isOpenArg = true, onOpenChange, ...rest } = props;
  const [isOpen, setIsOpen] = useState(isOpenArg);

  useEffect(() => {
    setIsOpen(isOpenArg);
  }, [isOpenArg]);

  return (
    <Modal
      {...rest}
      isOpen={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
        onOpenChange?.(open);
      }}
    />
  );
}

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

const DEFAULT_SOURCE = `<Modal
  title="Confirm action"
  trigger={<Button>Open</Button>}
  footer={
    <Button variant="destructive" slot="close">
      Confirm
    </Button>
  }
>
  <p className="text-sm text-foreground-secondary">
    Are you sure you want to continue? This action cannot be undone.
  </p>
</Modal>`;

export const Default: Story = {
  parameters: {
    docs: {
      // ModalStory only wires the open state to Storybook's isOpen control.
      source: { code: DEFAULT_SOURCE, language: "tsx" },
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
    <ModalStory
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
    </ModalStory>
  ),
};

const WITHCONFIRMDISMISS_SOURCE = `<Modal
  title="Confirm action"
  showCancelButton={false}
  showCloseButton={false}
  trigger={<Button>Open</Button>}
  footer={
    <Button variant="destructive" slot="close">
      Confirm
    </Button>
  }
>
  <p className="text-sm text-foreground-secondary">
    Are you sure you want to continue? This action cannot be undone.
  </p>
</Modal>`;

export const WithConfirmDismiss: Story = {
  parameters: {
    docs: {
      // ModalStory only wires the open state to Storybook's isOpen control.
      source: { code: WITHCONFIRMDISMISS_SOURCE, language: "tsx" },
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
    <ModalStory
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
    </ModalStory>
  ),
};

const WITHFOOTERCANCEL_SOURCE = `<Modal title="Terms updated" showCancelButton trigger={<Button>Open</Button>}>
  <p className="text-sm text-foreground-secondary">
    We have updated our terms of service. Review the changes on the settings page when you are ready.
  </p>
</Modal>`;

export const WithFooterCancel: Story = {
  parameters: {
    docs: {
      // ModalStory only wires the open state to Storybook's isOpen control.
      source: { code: WITHFOOTERCANCEL_SOURCE, language: "tsx" },
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
    <ModalStory {...args}>
      <p className="text-sm text-foreground-secondary">
        We have updated our terms of service. Review the changes on the settings page when you are
        ready.
      </p>
    </ModalStory>
  ),
};

const WITHHEADERCLOSE_SOURCE = `<Modal title="Quick tip" showCancelButton={false} trigger={<Button>Open</Button>}>
  <p className="text-sm text-foreground-secondary">
    Use keyboard shortcuts from the command palette to navigate faster.
  </p>
</Modal>`;

export const WithHeaderClose: Story = {
  parameters: {
    docs: {
      // ModalStory only wires the open state to Storybook's isOpen control.
      source: { code: WITHHEADERCLOSE_SOURCE, language: "tsx" },
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
    <ModalStory {...args}>
      <p className="text-sm text-foreground-secondary">
        Use keyboard shortcuts from the command palette to navigate faster.
      </p>
    </ModalStory>
  ),
};

const WITHSCROLLABLECONTENT_SOURCE = `<Modal
  title="Release notes"
  trigger={<Button>Open</Button>}
  footer={<Button slot="close">Got it</Button>}
>
  <div className="flex flex-col gap-4 text-sm text-foreground-secondary">
    <p>…</p>
    <p>…</p>
  </div>
</Modal>`;

export const WithScrollableContent: Story = {
  parameters: {
    docs: {
      // ModalStory only wires the open state to Storybook's isOpen control.
      source: { code: WITHSCROLLABLECONTENT_SOURCE, language: "tsx" },
      description: {
        story: "Long body copy scrolls inside the modal while the header and footer stay fixed.",
      },
    },
  },
  args: {
    title: "Release notes",
  },
  render: (args) => (
    <ModalStory {...args} footer={<Button slot="close">Got it</Button>}>
      <div className="flex flex-col gap-4 text-sm text-foreground-secondary">
        {Array.from({ length: 12 }, (_, index) => (
          <p key={index}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        ))}
      </div>
    </ModalStory>
  ),
};

export const Controlled: Story = {
  args: {
    title: "Controlled modal",
    isOpen: false,
  },
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

const WITHCUSTOMHEADER_SOURCE = `import { Heading } from "react-aria-components";

<Modal
  showCancelButton={false}
  trigger={<Button>Open</Button>}
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
</Modal>`;

export const WithCustomHeader: Story = {
  parameters: {
    docs: {
      // ModalStory only wires the open state to Storybook's isOpen control.
      source: { code: WITHCUSTOMHEADER_SOURCE, language: "tsx" },
      description: {
        story:
          "Replace the default header with `header`. Include `Heading slot=\"title\"` so assistive tech gets a dialog label.",
      },
    },
  },
  args: {
    title: "Custom header",
    showCancelButton: false,
  },
  render: (args) => (
    <ModalStory
      showCancelButton={args.showCancelButton}
      showCloseButton={args.showCloseButton}
      isOpen={args.isOpen}
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
    </ModalStory>
  ),
};

/**
 * Test-only: the browsed stories open the modal straight away, so the trigger
 * flow (open, trap focus, close, return focus) runs here instead.
 */
export const KeyboardTest: Story = {
  tags: ["!dev", "!autodocs"],
  parameters: TEST_ONLY_PARAMETERS,
  // Not spread into Modal: the meta's isOpen arg would skip the trigger flow under test.
  args: { title: "Confirm action" },
  render: () => (
    <Modal
      title="Confirm action"
      trigger={<Button>Open</Button>}
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
  play: async ({ canvas, userEvent, step }) => {
    const trigger = canvas.getByRole("button", { name: "Open" });

    await step("Tab to the trigger and press Enter to open the modal", async () => {
      await userEvent.tab();
      await expect(trigger).toHaveFocus();
      await userEvent.keyboard("{Enter}");
      const dialog = await screen.findByRole("dialog", { name: "Confirm action" });
      await waitFor(() => expect(dialog).toContainElement(document.activeElement as HTMLElement));
    });

    await step("Tab and Shift+Tab keep focus inside the modal", async () => {
      const dialog = screen.getByRole("dialog");
      for (let i = 0; i < 5; i++) {
        await userEvent.tab();
        await expect(dialog).toContainElement(document.activeElement as HTMLElement);
      }
      for (let i = 0; i < 5; i++) {
        await userEvent.tab({ shift: true });
        await expect(dialog).toContainElement(document.activeElement as HTMLElement);
      }
    });

    await step("Escape closes it and focus returns to the trigger", async () => {
      await userEvent.keyboard("{Escape}");
      await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
      await expect(trigger).toHaveFocus();
    });
  },
};
