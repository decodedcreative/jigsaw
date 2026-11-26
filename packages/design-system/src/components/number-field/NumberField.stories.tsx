import type { Meta, StoryObj } from "@storybook/react";
import { expect } from "storybook/test";
import { NumberField } from "./NumberField";
import { clearFocus } from "../../test-utils/story-play";

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
  play: async ({ canvas, userEvent, step }) => {
    const input = canvas.getByRole("textbox", { name: "Quantity" });

    await step("Tab moves focus to the input, not the stepper buttons", async () => {
      await userEvent.tab();
      await expect(input).toHaveFocus();
    });

    await step("Arrow Up and Arrow Down step the value", async () => {
      await userEvent.keyboard("{ArrowUp}");
      await expect(input).toHaveValue("2");
      await userEvent.keyboard("{ArrowDown}");
      await expect(input).toHaveValue("1");
    });

    await step("End jumps to the maximum and Home to the minimum", async () => {
      await userEvent.keyboard("{End}");
      await expect(input).toHaveValue("99");
      await userEvent.keyboard("{Home}");
      await expect(input).toHaveValue("0");
      await userEvent.keyboard("{ArrowUp}");
      await expect(input).toHaveValue("1");
    });

    await step("Tab leaves the field", async () => {
      await userEvent.tab();
      await expect(input).not.toHaveFocus();
    });

    clearFocus();
  },
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
