import type { Meta, StoryObj } from "@storybook/react";
import { SearchField } from "./SearchField";

const meta = {
  title: "Design System/SearchField",
  component: SearchField,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    isDisabled: { control: "boolean" },
    isInvalid: { control: "boolean" },
  },
} satisfies Meta<typeof SearchField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { label: "Search", placeholder: "Search components..." },
};

export const WithValue: Story = {
  args: { label: "Search", defaultValue: "Button" },
};

export const WithDescription: Story = {
  args: { label: "Search", description: "Press Escape to clear." },
};

export const WithError: Story = {
  args: {
    label: "Search",
    defaultValue: "???",
    errorMessage: "No results found for this query.",
  },
};

export const Disabled: Story = {
  args: { label: "Search", isDisabled: true, defaultValue: "Locked" },
};

export const NoLabel: Story = {
  args: { placeholder: "Search...", "aria-label": "Search" },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-3" style={{ width: 300 }}>
      <SearchField size="sm" label="Small" placeholder="Small search" />
      <SearchField size="md" label="Medium (default)" placeholder="Medium search" />
      <SearchField size="lg" label="Large" placeholder="Large search" />
    </div>
  ),
};

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-3" style={{ width: 300 }}>
      <SearchField label="Default" placeholder="Search..." />
      <SearchField label="With value" defaultValue="Button" />
      <SearchField label="With description" description="Helper text" />
      <SearchField label="Error" defaultValue="???" errorMessage="Invalid search query" />
      <SearchField label="Disabled" isDisabled defaultValue="Locked" />
    </div>
  ),
};
