import type { Meta, StoryObj } from "@storybook/react";
import { CheckboxGroup } from "./index";
import { Checkbox } from "../checkbox";

const meta = {
  title: "Design System/CheckboxGroup",
  component: CheckboxGroup,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    isDisabled: { control: "boolean" },
    isInvalid: { control: "boolean" },
  },
} satisfies Meta<typeof CheckboxGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

const items = (
  <>
    <Checkbox value="react" label="React" />
    <Checkbox value="vue" label="Vue" />
    <Checkbox value="svelte" label="Svelte" />
  </>
);

export const Default: Story = {
  args: { label: "Favorite frameworks", description: "Pick all that apply." },
  render: (args) => <CheckboxGroup {...args}>{items}</CheckboxGroup>,
};

export const WithPreselected: Story = {
  args: { label: "Favorite frameworks", defaultValue: ["react", "svelte"] },
  render: (args) => <CheckboxGroup {...args}>{items}</CheckboxGroup>,
};

export const WithError: Story = {
  args: {
    label: "Favorite frameworks",
    errorMessage: "Pick at least one option.",
  },
  render: (args) => <CheckboxGroup {...args}>{items}</CheckboxGroup>,
};

export const Disabled: Story = {
  args: { label: "Favorite frameworks", isDisabled: true },
  render: (args) => <CheckboxGroup {...args}>{items}</CheckboxGroup>,
};
