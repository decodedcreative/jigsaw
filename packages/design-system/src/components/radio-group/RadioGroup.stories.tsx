import type { Meta, StoryObj } from "@storybook/react";
import { expect } from "storybook/test";
import { RadioGroup } from "./index";
import { clearFocus } from "../../test-utils/story-play";

const meta = {
  title: "Design System/RadioGroup",
  component: RadioGroup,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    isDisabled: { control: "boolean" },
    isInvalid: { control: "boolean" },
  },
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

const items = (
  <>
    <RadioGroup.Item value="free" label="Free" description="Up to 3 projects" />
    <RadioGroup.Item value="pro" label="Pro" description="Unlimited projects" />
    <RadioGroup.Item value="team" label="Team" description="Pro features for everyone" />
  </>
);

export const Default: Story = {
  args: { label: "Plan", description: "Choose your subscription tier." },
  render: (args) => <RadioGroup {...args}>{items}</RadioGroup>,
};

export const WithPreselected: Story = {
  args: { label: "Plan", defaultValue: "pro" },
  render: (args) => <RadioGroup {...args}>{items}</RadioGroup>,
  play: async ({ canvas, userEvent, step }) => {
    const pro = canvas.getByRole("radio", { name: /^Pro\b/ });
    const team = canvas.getByRole("radio", { name: /^Team\b/ });

    await step("Tab moves focus to the selected radio", async () => {
      await userEvent.tab();
      await expect(pro).toHaveFocus();
    });

    await step("Arrow Down moves focus and selection to the next radio", async () => {
      await userEvent.keyboard("{ArrowDown}");
      await expect(team).toHaveFocus();
      await expect(team).toBeChecked();
    });

    await step("Arrow Up moves back", async () => {
      await userEvent.keyboard("{ArrowUp}");
      await expect(pro).toHaveFocus();
      await expect(pro).toBeChecked();
    });

    await step("The group is a single tab stop", async () => {
      await userEvent.tab();
      for (const radio of canvas.getAllByRole("radio")) {
        await expect(radio).not.toHaveFocus();
      }
    });

    clearFocus();
  },
};

export const WithError: Story = {
  args: { label: "Plan", errorMessage: "Please pick a plan." },
  render: (args) => <RadioGroup {...args}>{items}</RadioGroup>,
};

export const Disabled: Story = {
  args: { label: "Plan", isDisabled: true, defaultValue: "free" },
  render: (args) => <RadioGroup {...args}>{items}</RadioGroup>,
  play: async ({ canvas, userEvent, step }) => {
    await step("Tab skips the disabled group", async () => {
      await userEvent.tab();
      for (const radio of canvas.getAllByRole("radio")) {
        await expect(radio).not.toHaveFocus();
      }
    });
  },
};

export const ItemSizes: Story = {
  render: () => (
    <RadioGroup label="Sizes">
      <RadioGroup.Item value="sm" size="sm" label="Small" />
      <RadioGroup.Item value="md" size="md" label="Medium (default)" />
      <RadioGroup.Item value="lg" size="lg" label="Large" />
    </RadioGroup>
  ),
};

export const ItemStates: Story = {
  render: () => (
    <RadioGroup label="States" defaultValue="checked">
      <RadioGroup.Item value="default" label="Default" />
      <RadioGroup.Item value="checked" label="Checked" />
      <RadioGroup.Item value="error" label="Error" hasError />
      <RadioGroup.Item value="disabled" label="Disabled" isDisabled />
    </RadioGroup>
  ),
};
