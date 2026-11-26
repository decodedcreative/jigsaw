import type { Meta, StoryObj } from "@storybook/react";
import { expect } from "storybook/test";
import { Tabs, TabList, Tab, TabPanel } from "./index";
import { clearFocus } from "../../test-utils/story-play";

const meta = {
  title: "Design System/Tabs",
  component: Tabs,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div style={{ width: 420 }}>
      <Tabs>
        <TabList aria-label="Sections">
          <Tab id="overview">Overview</Tab>
          <Tab id="usage">Usage</Tab>
          <Tab id="props">Props</Tab>
        </TabList>
        <TabPanel id="overview">High-level description of the component.</TabPanel>
        <TabPanel id="usage">How to use it in practice.</TabPanel>
        <TabPanel id="props">Available props and their types.</TabPanel>
      </Tabs>
    </div>
  ),
  play: async ({ canvas, userEvent, step }) => {
    const overview = canvas.getByRole("tab", { name: "Overview" });
    const usage = canvas.getByRole("tab", { name: "Usage" });
    const props = canvas.getByRole("tab", { name: "Props" });

    await step("Tab moves focus to the selected tab", async () => {
      await userEvent.tab();
      await expect(overview).toHaveFocus();
      await expect(overview).toHaveAttribute("aria-selected", "true");
    });

    await step("Arrow Right selects the next tab and shows its panel", async () => {
      await userEvent.keyboard("{ArrowRight}");
      await expect(usage).toHaveFocus();
      await expect(usage).toHaveAttribute("aria-selected", "true");
      await expect(canvas.getByRole("tabpanel")).toHaveTextContent("How to use it in practice.");
    });

    await step("End selects the last tab and Home the first", async () => {
      await userEvent.keyboard("{End}");
      await expect(props).toHaveFocus();
      await userEvent.keyboard("{Home}");
      await expect(overview).toHaveFocus();
      await expect(overview).toHaveAttribute("aria-selected", "true");
    });

    await step("Tab moves focus from the tab list into the panel", async () => {
      await userEvent.tab();
      await expect(canvas.getByRole("tabpanel")).toHaveFocus();
    });

    clearFocus();
  },
};

export const Pills: Story = {
  render: () => (
    <div style={{ width: 420 }}>
      <Tabs>
        <TabList aria-label="Sections" variant="pills">
          <Tab id="day" variant="pills">Day</Tab>
          <Tab id="week" variant="pills">Week</Tab>
          <Tab id="month" variant="pills">Month</Tab>
        </TabList>
        <TabPanel id="day">Today's stats.</TabPanel>
        <TabPanel id="week">This week's stats.</TabPanel>
        <TabPanel id="month">This month's stats.</TabPanel>
      </Tabs>
    </div>
  ),
};
