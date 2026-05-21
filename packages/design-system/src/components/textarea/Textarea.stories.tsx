import type { Meta, StoryObj } from "@storybook/react";
import { Textarea } from "./Textarea";

const meta = {
  title: "Design System/Textarea",
  component: Textarea,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    isDisabled: { control: "boolean" },
    isInvalid: { control: "boolean" },
    isReadOnly: { control: "boolean" },
    isRequired: { control: "boolean" },
    rows: { control: "number" },
  },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { label: "Bio", placeholder: "Tell us about yourself..." },
};

export const WithValue: Story = {
  args: { label: "Bio", defaultValue: "I build design systems." },
};

export const WithDescription: Story = {
  args: { label: "Bio", description: "Max 280 characters." },
};

export const Required: Story = {
  args: { label: "Comment", isRequired: true, placeholder: "Required" },
};

export const WithError: Story = {
  args: { label: "Bio", defaultValue: "", errorMessage: "Bio cannot be empty." },
};

export const ErrorWithDescription: Story = {
  args: {
    label: "Bio",
    description: "Max 280 characters.",
    defaultValue: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    errorMessage: "Bio exceeds the maximum length.",
  },
};

export const Disabled: Story = {
  args: { label: "Bio", isDisabled: true, defaultValue: "Cannot edit this." },
};

export const ReadOnly: Story = {
  args: { label: "Terms", isReadOnly: true, defaultValue: "These terms cannot be edited." },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-3" style={{ width: 320 }}>
      <Textarea size="sm" label="Small" placeholder="Small textarea" />
      <Textarea size="md" label="Medium (default)" placeholder="Medium textarea" />
      <Textarea size="lg" label="Large" placeholder="Large textarea" />
    </div>
  ),
};

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-3" style={{ width: 320 }}>
      <Textarea label="Default" placeholder="Type here..." />
      <Textarea label="With description" description="Helper text" />
      <Textarea label="Required" isRequired />
      <Textarea label="Error" defaultValue="" errorMessage="Required field" />
      <Textarea label="Disabled" isDisabled defaultValue="Locked content" />
      <Textarea label="Read only" isReadOnly defaultValue="Read only content" />
    </div>
  ),
};
