import type { Meta, StoryObj } from "@storybook/react";
import { Select, SelectItem } from "./index";

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
} satisfies Meta<typeof Select<{ id: string; name: string }>>;

export default meta;
type Story = StoryObj<typeof meta>;

const options = (
  <>
    <SelectItem id="react">React</SelectItem>
    <SelectItem id="vue">Vue</SelectItem>
    <SelectItem id="svelte">Svelte</SelectItem>
    <SelectItem id="solid">Solid</SelectItem>
  </>
);

export const Default: Story = {
  args: { label: "Framework", placeholder: "Pick one" },
  render: (args) => (
    <div style={{ width: 280 }}>
      <Select {...args}>{options}</Select>
    </div>
  ),
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
