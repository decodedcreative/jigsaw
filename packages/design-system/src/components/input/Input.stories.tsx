import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./Input";

const meta = {
  title: "Design System/Input",
  component: Input,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    isDisabled: { control: "boolean" },
    isInvalid: { control: "boolean" },
    isReadOnly: { control: "boolean" },
    isRequired: { control: "boolean" },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { label: "Email", placeholder: "you@example.com" },
};

export const WithValue: Story = {
  args: { label: "Email", defaultValue: "you@example.com" },
};

export const WithDescription: Story = {
  args: { label: "Username", description: "3–24 characters." },
};

export const Required: Story = {
  args: { label: "Email", isRequired: true, placeholder: "Required" },
};

export const WithError: Story = {
  args: {
    label: "Email",
    defaultValue: "invalid",
    errorMessage: "Please enter a valid email.",
  },
};

export const ErrorWithDescription: Story = {
  args: {
    label: "Password",
    description: "At least 8 characters.",
    defaultValue: "abc",
    errorMessage: "Password is too short.",
  },
};

export const Disabled: Story = {
  args: { label: "Email", isDisabled: true, defaultValue: "locked@example.com" },
};

export const ReadOnly: Story = {
  args: { label: "User ID", isReadOnly: true, defaultValue: "usr_8392nf" },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-3" style={{ width: 300 }}>
      <Input size="sm" label="Small" placeholder="Small input" />
      <Input size="md" label="Medium (default)" placeholder="Medium input" />
      <Input size="lg" label="Large" placeholder="Large input" />
    </div>
  ),
};

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-3" style={{ width: 300 }}>
      <Input label="Default" placeholder="Type here..." />
      <Input label="With description" description="Helper text" />
      <Input label="Required" isRequired />
      <Input label="Error" defaultValue="bad" errorMessage="Invalid value" />
      <Input label="Disabled" isDisabled defaultValue="Locked" />
      <Input label="Read only" isReadOnly defaultValue="Read only" />
    </div>
  ),
};

