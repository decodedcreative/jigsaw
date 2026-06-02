import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { Tabs } from "../../Tabs";
import { TabList } from "../TabList/TabList";
import { Tab } from "./Tab";
import { TabPanel } from "../TabPanel/TabPanel";

afterEach(() => {
  cleanup();
});

describe("Tab", () => {
  it("renders a tab button", () => {
    render(
      <Tabs>
        <TabList aria-label="Test tabs">
          <Tab id="tab1">Tab One</Tab>
        </TabList>
        <TabPanel id="tab1">Content One</TabPanel>
      </Tabs>
    );
    expect(screen.getByRole("tab", { name: "Tab One" })).toBeInTheDocument();
  });

  it("is selected when active", () => {
    render(
      <Tabs defaultSelectedKey="tab1">
        <TabList aria-label="Test tabs">
          <Tab id="tab1">Tab One</Tab>
          <Tab id="tab2">Tab Two</Tab>
        </TabList>
        <TabPanel id="tab1">Content One</TabPanel>
        <TabPanel id="tab2">Content Two</TabPanel>
      </Tabs>
    );
    expect(screen.getByRole("tab", { name: "Tab One" })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("tab", { name: "Tab Two" })).toHaveAttribute("aria-selected", "false");
  });
});
