import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Checkbox } from "./index";

const meta = {
  title: "Design System/Checkbox",
  component: Checkbox,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    hasError: { control: "boolean" },
    isDisabled: { control: "boolean" },
    isReadOnly: { control: "boolean" },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

const SELECT_ALL_ITEMS = [
  { id: "notifications", label: "Email notifications" },
  { id: "newsletter", label: "Weekly newsletter" },
  { id: "updates", label: "Product updates" },
] as const;

type ItemId = (typeof SELECT_ALL_ITEMS)[number]["id"];

/** Select-all with child checkboxes — demonstrates indeterminate derived from partial selection. */
const IndeterminateExample = () => {
  const [items, setItems] = useState<Record<ItemId, boolean>>({
    notifications: true,
    newsletter: false,
    updates: true,
  });

  const values = Object.values(items);
  const allSelected = values.every(Boolean);
  const someSelected = values.some(Boolean);
  const isIndeterminate = someSelected && !allSelected;

  const setItem = (id: ItemId, selected: boolean) => {
    setItems((prev) => ({ ...prev, [id]: selected }));
  };

  return (
    <div className="flex flex-col gap-3">
      <Checkbox
        label="Select all"
        isSelected={allSelected}
        isIndeterminate={isIndeterminate}
        onChange={(selected) => {
          setItems({
            notifications: selected,
            newsletter: selected,
            updates: selected,
          });
        }}
      />
      <div className="ml-6 flex flex-col gap-2 border-l border-border-default pl-4">
        {SELECT_ALL_ITEMS.map(({ id, label }) => (
          <Checkbox
            key={id}
            label={label}
            isSelected={items[id]}
            onChange={(selected) => setItem(id, selected)}
          />
        ))}
      </div>
    </div>
  );
};

const INDETERMINATE_SOURCE = `const items = [
  { id: "notifications", label: "Email notifications" },
  { id: "newsletter", label: "Weekly newsletter" },
  { id: "updates", label: "Product updates" },
];

function NotificationPreferences() {
  const [selected, setSelected] = useState({ notifications: true, newsletter: false, updates: true });
  const values = Object.values(selected);
  const allSelected = values.every(Boolean);
  const isIndeterminate = values.some(Boolean) && !allSelected;

  return (
    <div className="flex flex-col gap-3">
      <Checkbox
        label="Select all"
        isSelected={allSelected}
        isIndeterminate={isIndeterminate}
        onChange={(checked) =>
          setSelected({ notifications: checked, newsletter: checked, updates: checked })
        }
      />
      <div className="ml-6 flex flex-col gap-2 border-l border-border-default pl-4">
        {items.map(({ id, label }) => (
          <Checkbox
            key={id}
            label={label}
            isSelected={selected[id]}
            onChange={(checked) => setSelected((prev) => ({ ...prev, [id]: checked }))}
          />
        ))}
      </div>
    </div>
  );
}`;

export const Default: Story = {
  args: { label: "Accept terms" },
};

export const Checked: Story = {
  args: { label: "Accept terms", defaultSelected: true },
};

export const Indeterminate: Story = {
  render: () => <IndeterminateExample />,
  parameters: {
    // The example keeps the select-all state in a local component; show it in full.
    docs: { source: { code: INDETERMINATE_SOURCE, language: "tsx" } },
  },
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
    <div className="flex flex-col gap-6">
      {(["sm", "md", "lg"] as const).map((size) => (
        <div key={size} className="flex flex-col gap-2">
          <Checkbox size={size} label={`${size} — interactive`} />
          <Checkbox size={size} label={`${size} — checked (snapshot)`} isSelected isReadOnly />
          <Checkbox size={size} label={`${size} — indeterminate (snapshot)`} isIndeterminate isReadOnly />
        </div>
      ))}
    </div>
  ),
};

/** Static gallery — read-only rows show fixed visuals; Default row is interactive. */
export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <Checkbox label="Default (interactive)" />
      <Checkbox label="Checked" isSelected isReadOnly />
      <Checkbox label="Indeterminate" isIndeterminate isReadOnly />
      <Checkbox label="With description" description="Helpful hint" />
      <Checkbox label="Error" hasError />
      <Checkbox label="Disabled" isDisabled />
      <Checkbox label="Disabled checked" isDisabled isSelected />
    </div>
  ),
};
