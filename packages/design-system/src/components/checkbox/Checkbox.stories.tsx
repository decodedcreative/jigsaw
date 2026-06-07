import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Checkbox } from "./index";
import type { CheckboxProps } from "./Checkbox.types";

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

type ControlledCheckboxProps = Omit<CheckboxProps, "isSelected" | "isIndeterminate" | "onChange"> & {
  defaultSelected?: boolean;
  defaultIndeterminate?: boolean;
};

/** Standalone checkbox with local selection state — matches typical app usage. */
const ControlledCheckbox = ({
  defaultSelected = false,
  defaultIndeterminate = false,
  ...props
}: ControlledCheckboxProps) => {
  const [isSelected, setIsSelected] = useState(defaultSelected);
  const [isIndeterminate, setIsIndeterminate] = useState(defaultIndeterminate);

  return (
    <Checkbox
      {...props}
      isSelected={isSelected}
      isIndeterminate={isIndeterminate}
      onChange={(selected) => {
        setIsSelected(selected);
        setIsIndeterminate(false);
      }}
    />
  );
};

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

export const Default: Story = {
  args: { label: "Accept terms" },
  render: (args) => <ControlledCheckbox {...args} />,
};

export const Checked: Story = {
  args: { label: "Accept terms" },
  render: (args) => <ControlledCheckbox {...args} defaultSelected />,
};

export const Indeterminate: Story = {
  render: () => <IndeterminateExample />,
};

export const WithDescription: Story = {
  args: { label: "Subscribe", description: "Receive weekly product updates." },
  render: (args) => <ControlledCheckbox {...args} />,
};

export const Error: Story = {
  args: { label: "Required field", hasError: true },
  render: (args) => <ControlledCheckbox {...args} />,
};

export const ErrorWithDescription: Story = {
  args: {
    label: "Accept terms",
    description: "You must accept to continue.",
    hasError: true,
  },
  render: (args) => <ControlledCheckbox {...args} />,
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
          <ControlledCheckbox size={size} label={`${size} — interactive`} />
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
      <ControlledCheckbox label="Default (interactive)" />
      <Checkbox label="Checked" isSelected isReadOnly />
      <Checkbox label="Indeterminate" isIndeterminate isReadOnly />
      <ControlledCheckbox label="With description" description="Helpful hint" />
      <ControlledCheckbox label="Error" hasError />
      <Checkbox label="Disabled" isDisabled />
      <Checkbox label="Disabled checked" isDisabled isSelected />
    </div>
  ),
};
