import type { Meta, StoryObj } from "@storybook/react";
import { RadioGroup, Radio } from "./RadioGroup";

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
    <Radio value="free" label="Free" description="Up to 3 projects" />
    <Radio value="pro" label="Pro" description="Unlimited projects" />
    <Radio value="team" label="Team" description="Pro features for everyone" />
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

export const RadioSizes: Story = {
  render: () => (
    <RadioGroup label="Sizes">
      <Radio value="sm" size="sm" label="Small" />
      <Radio value="md" size="md" label="Medium (default)" />
      <Radio value="lg" size="lg" label="Large" />
    </RadioGroup>
  ),
};

export const RadioStates: Story = {
  render: () => (
    <RadioGroup label="States" defaultValue="checked">
      <Radio value="default" label="Default" />
      <Radio value="checked" label="Checked" />
      <Radio value="error" label="Error" hasError />
      <Radio value="disabled" label="Disabled" isDisabled />
    </RadioGroup>
  ),
};
