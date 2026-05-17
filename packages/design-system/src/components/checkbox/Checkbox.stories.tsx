import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "./Checkbox";

const meta = {
  title: "Design System/Checkbox",
  component: Checkbox,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    hasError: { control: "boolean" },
    isDisabled: { control: "boolean" },
    isSelected: { control: "boolean" },
    isIndeterminate: { control: "boolean" },
    isReadOnly: { control: "boolean" },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { label: "Accept terms" } };

export const Checked: Story = {
  args: { label: "Accept terms", isSelected: true },
};

export const Indeterminate: Story = {
  args: { label: "Select all", isIndeterminate: true },
};

export const WithDescription: Story = {
  args: { label: "Subscribe", description: "Receive weekly product updates." },
};

export const Error: Story = {
  args: { label: "Required field", hasError: true },
};

export const ErrorWithDescription: Story = {
  args: {
    label: "Accept terms",
    description: "You must accept to continue.",
    hasError: true,
  },
};

export const Disabled: Story = {
  args: { label: "Disabled option", isDisabled: true },
};

export const DisabledChecked: Story = {
  args: { label: "Locked in", isDisabled: true, isSelected: true },
};

export const ReadOnly: Story = {
  args: { label: "Read only", isReadOnly: true, isSelected: true },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <Checkbox size="sm" label="Small" />
      <Checkbox size="md" label="Medium (default)" />
      <Checkbox size="lg" label="Large" />
    </div>
  ),
};

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <Checkbox label="Default" />
      <Checkbox label="Checked" isSelected />
      <Checkbox label="Indeterminate" isIndeterminate />
      <Checkbox label="With description" description="Helpful hint" />
      <Checkbox label="Error" hasError />
      <Checkbox label="Disabled" isDisabled />
      <Checkbox label="Disabled checked" isDisabled isSelected />
    </div>
  ),
};
