import type { Meta, StoryObj } from "@storybook/react";
import { NumberField } from "./NumberField";

const meta = {
  title: "Design System/NumberField",
  component: NumberField,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    isDisabled: { control: "boolean" },
    isInvalid: { control: "boolean" },
    isReadOnly: { control: "boolean" },
    isRequired: { control: "boolean" },
  },
} satisfies Meta<typeof NumberField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { label: "Quantity", defaultValue: 1, minValue: 0, maxValue: 99 },
};

export const WithDescription: Story = {
  args: {
    label: "Quantity",
    description: "Between 1 and 99.",
    defaultValue: 1,
    minValue: 1,
    maxValue: 99,
  },
};

export const Required: Story = {
  args: { label: "Quantity", isRequired: true },
};

export const WithError: Story = {
  args: { label: "Quantity", defaultValue: 0, errorMessage: "Out of stock" },
};

export const ErrorWithDescription: Story = {
  args: {
    label: "Quantity",
    description: "Available stock: 5",
    defaultValue: 10,
    errorMessage: "Exceeds available stock",
  },
};

export const Disabled: Story = {
  args: { label: "Quantity", isDisabled: true, defaultValue: 1 },
};

export const ReadOnly: Story = {
  args: { label: "Quantity", isReadOnly: true, defaultValue: 42 },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-3" style={{ width: 220 }}>
      <NumberField size="sm" label="Small" defaultValue={1} />
      <NumberField size="md" label="Medium (default)" defaultValue={1} />
      <NumberField size="lg" label="Large" defaultValue={1} />
    </div>
  ),
};

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-3" style={{ width: 220 }}>
      <NumberField label="Default" defaultValue={1} />
      <NumberField label="With description" description="Helper text" defaultValue={1} />
      <NumberField label="Required" isRequired />
      <NumberField label="Error" defaultValue={0} errorMessage="Invalid value" />
      <NumberField label="Disabled" isDisabled defaultValue={1} />
      <NumberField label="Read only" isReadOnly defaultValue={42} />
    </div>
  ),
};
