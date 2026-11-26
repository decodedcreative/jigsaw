import type { Meta, StoryObj } from "@storybook/react";
import { expect } from "storybook/test";
import { clearFocus } from "../../test-utils/story-play";
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
  play: async ({ canvas, userEvent, step }) => {
    const react = canvas.getByRole("checkbox", { name: "React" });
    const vue = canvas.getByRole("checkbox", { name: "Vue" });

    await step("Each checkbox is its own tab stop", async () => {
      await userEvent.tab();
      await expect(react).toHaveFocus();
      await userEvent.tab();
      await expect(vue).toHaveFocus();
    });

    await step("Space toggles only the focused checkbox", async () => {
      await userEvent.keyboard(" ");
      await expect(vue).toBeChecked();
      await expect(react).not.toBeChecked();
      await userEvent.keyboard(" ");
      await expect(vue).not.toBeChecked();
    });

    clearFocus();
  },
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
  play: async ({ canvas, userEvent, step }) => {
    await step("Tab skips every disabled checkbox", async () => {
      await userEvent.tab();
      for (const checkbox of canvas.getAllByRole("checkbox")) {
        await expect(checkbox).not.toHaveFocus();
      }
    });
  },
};
