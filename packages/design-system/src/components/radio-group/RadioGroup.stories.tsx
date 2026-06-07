import type { Meta, StoryObj } from "@storybook/react";
import { RadioGroup } from "./index";

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
};

export const WithError: Story = {
  args: { label: "Plan", errorMessage: "Please pick a plan." },
  render: (args) => <RadioGroup {...args}>{items}</RadioGroup>,
};

export const Disabled: Story = {
  args: { label: "Plan", isDisabled: true, defaultValue: "free" },
  render: (args) => <RadioGroup {...args}>{items}</RadioGroup>,
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
