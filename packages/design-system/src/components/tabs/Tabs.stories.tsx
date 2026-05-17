import type { Meta, StoryObj } from "@storybook/react";
import { Tabs, TabList, Tab, TabPanel } from "./Tabs";

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
