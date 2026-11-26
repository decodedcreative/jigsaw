import type { Meta, StoryObj } from "@storybook/react";
import { expect, fn, screen, waitFor } from "storybook/test";
import { Select } from "./index";
import { TEST_ONLY_PARAMETERS, clearFocus } from "../../test-utils/story-play";

const meta = {
  title: "Design System/Select",
  component: Select,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    isDisabled: { control: "boolean" },
    isInvalid: { control: "boolean" },
    isRequired: { control: "boolean" },
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

const options = (
  <>
    <Select.Item id="react">React</Select.Item>
    <Select.Item id="vue">Vue</Select.Item>
    <Select.Item id="svelte">Svelte</Select.Item>
    <Select.Item id="solid">Solid</Select.Item>
  </>
);

export const Default: Story = {
  args: { label: "Framework", placeholder: "Pick one" },
  render: (args) => (
    <div style={{ width: 280 }}>
      <Select {...args}>{options}</Select>
    </div>
  ),
  play: async ({ canvas, userEvent, step }) => {
    const trigger = canvas.getByRole("button", { name: /Framework/ });

    await step("Tab moves focus to the trigger", async () => {
      await userEvent.tab();
      await expect(trigger).toHaveFocus();
    });

    await step("Enter opens the list and focuses an option", async () => {
      await userEvent.keyboard("{Enter}");
      const listbox = await screen.findByRole("listbox");
      await expect(listbox).toContainElement(document.activeElement as HTMLElement);
    });

    await step("Arrow Down moves focus through the options", async () => {
      await userEvent.keyboard("{ArrowDown}");
      await expect(document.activeElement).toHaveAttribute("role", "option");
    });

    await step("Escape closes the list without choosing, and focus returns to the trigger", async () => {
      await userEvent.keyboard("{Escape}");
      await waitFor(() => expect(screen.queryByRole("listbox")).toBeNull());
      await expect(trigger).toHaveFocus();
      await expect(trigger).toHaveTextContent("Pick one");
    });

    clearFocus();
  },
};

/** Test-only: choosing an option changes the story, so it doesn't run on Default. */
export const KeyboardSelection: Story = {
  tags: ["!dev", "!autodocs"],
  parameters: TEST_ONLY_PARAMETERS,
  args: { label: "Framework", placeholder: "Pick one", onSelectionChange: fn() },
  render: (args) => (
    <div style={{ width: 280 }}>
      <Select {...args}>{options}</Select>
    </div>
  ),
  play: async ({ args, canvas, userEvent, step }) => {
    const trigger = canvas.getByRole("button", { name: /Framework/ });

    await step("Open the list from the keyboard", async () => {
      await userEvent.tab();
      await userEvent.keyboard("{Enter}");
      await screen.findByRole("listbox");
    });

    await step("Arrow to Vue and press Enter to choose it", async () => {
      await waitFor(() => expect(document.activeElement).toHaveAttribute("role", "option"));
      while (document.activeElement?.textContent !== "Vue") {
        await userEvent.keyboard("{ArrowDown}");
      }
      await userEvent.keyboard("{Enter}");
      await expect(args.onSelectionChange).toHaveBeenCalledWith("vue");
    });

    await step("The list closes, the trigger shows Vue and keeps focus", async () => {
      await waitFor(() => expect(screen.queryByRole("listbox")).toBeNull());
      await expect(trigger).toHaveTextContent("Vue");
      await expect(trigger).toHaveFocus();
    });
  },
};

export const WithSelectedValue: Story = {
  args: { label: "Framework", defaultValue: "react" },
  render: (args) => (
    <div style={{ width: 280 }}>
      <Select {...args}>{options}</Select>
    </div>
  ),
};

export const WithDescription: Story = {
  args: {
    label: "Framework",
    description: "We'll scaffold a starter for your choice.",
    placeholder: "Pick one",
  },
  render: (args) => (
    <div style={{ width: 280 }}>
      <Select {...args}>{options}</Select>
    </div>
  ),
};

export const Required: Story = {
  args: { label: "Framework", isRequired: true, placeholder: "Required" },
  render: (args) => (
    <div style={{ width: 280 }}>
      <Select {...args}>{options}</Select>
    </div>
  ),
};

export const WithError: Story = {
  args: {
    label: "Framework",
    placeholder: "Pick one",
    errorMessage: "Please select a framework.",
  },
  render: (args) => (
    <div style={{ width: 280 }}>
      <Select {...args}>{options}</Select>
    </div>
  ),
};

export const ErrorWithDescription: Story = {
  args: {
    label: "Framework",
    description: "We'll scaffold a starter for your choice.",
    placeholder: "Pick one",
    errorMessage: "This field is required.",
  },
  render: (args) => (
    <div style={{ width: 280 }}>
      <Select {...args}>{options}</Select>
    </div>
  ),
};

export const Disabled: Story = {
  args: { label: "Framework", isDisabled: true, defaultValue: "react" },
  render: (args) => (
    <div style={{ width: 280 }}>
      <Select {...args}>{options}</Select>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-3" style={{ width: 280 }}>
      <Select size="sm" label="Small" placeholder="Small">{options}</Select>
      <Select size="md" label="Medium (default)" placeholder="Medium">{options}</Select>
      <Select size="lg" label="Large" placeholder="Large">{options}</Select>
    </div>
  ),
};

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-3" style={{ width: 280 }}>
      <Select label="Default" placeholder="Pick one">{options}</Select>
      <Select label="With selection" defaultValue="react">{options}</Select>
      <Select label="Required" isRequired placeholder="Required">{options}</Select>
      <Select label="Error" placeholder="Pick one" errorMessage="Required">{options}</Select>
      <Select label="Disabled" isDisabled defaultValue="react">{options}</Select>
    </div>
  ),
};
