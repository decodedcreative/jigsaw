import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { Tabs } from "../../Tabs";
import { TabList } from "./TabList";
import { Tab } from "../Tab/Tab";
import { TabPanel } from "../TabPanel/TabPanel";

afterEach(() => {
  cleanup();
});

describe("TabList", () => {
  it("renders a tablist", () => {
    render(
      <Tabs>
        <TabList aria-label="Navigation tabs">
          <Tab id="tab1">Tab One</Tab>
        </TabList>
        <TabPanel id="tab1">Content One</TabPanel>
      </Tabs>
    );
    expect(screen.getByRole("tablist")).toBeInTheDocument();
  });
});
