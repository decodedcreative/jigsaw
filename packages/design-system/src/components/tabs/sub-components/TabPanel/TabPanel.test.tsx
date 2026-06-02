import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { Tabs } from "../../Tabs";
import { TabList } from "../TabList/TabList";
import { Tab } from "../Tab/Tab";
import { TabPanel } from "./TabPanel";

afterEach(() => {
  cleanup();
});

describe("TabPanel", () => {
  it("renders panel content for the selected tab", () => {
    render(
      <Tabs defaultSelectedKey="panel1">
        <TabList aria-label="Test tabs">
          <Tab id="panel1">Tab One</Tab>
          <Tab id="panel2">Tab Two</Tab>
        </TabList>
        <TabPanel id="panel1">Content One</TabPanel>
        <TabPanel id="panel2">Content Two</TabPanel>
      </Tabs>
    );
    expect(screen.getByText("Content One")).toBeVisible();
  });

  it("renders a tabpanel role", () => {
    render(
      <Tabs>
        <TabList aria-label="Test tabs">
          <Tab id="panel1">Tab One</Tab>
        </TabList>
        <TabPanel id="panel1">Content One</TabPanel>
      </Tabs>
    );
    expect(screen.getByRole("tabpanel")).toBeInTheDocument();
  });
});
