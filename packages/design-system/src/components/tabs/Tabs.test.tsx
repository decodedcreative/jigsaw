import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Tabs, TabList, Tab, TabPanel } from "./index";

afterEach(() => {
  cleanup();
});

const renderTabs = () =>
  render(
    <Tabs>
      <TabList aria-label="Navigation tabs">
        <Tab id="tab1">Tab One</Tab>
        <Tab id="tab2">Tab Two</Tab>
        <Tab id="tab3">Tab Three</Tab>
      </TabList>
      <TabPanel id="tab1">Content One</TabPanel>
      <TabPanel id="tab2">Content Two</TabPanel>
      <TabPanel id="tab3">Content Three</TabPanel>
    </Tabs>
  );

describe("Tabs", () => {
  it("renders a tablist", () => {
    renderTabs();
    expect(screen.getByRole("tablist")).toBeInTheDocument();
  });

  it("renders all tab buttons", () => {
    renderTabs();
    expect(screen.getAllByRole("tab")).toHaveLength(3);
  });

  it("renders tab labels", () => {
    renderTabs();
    expect(screen.getByRole("tab", { name: "Tab One" })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "Tab Two" })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "Tab Three" })).toBeInTheDocument();
  });

  it("first tab is selected by default", () => {
    renderTabs();
    expect(screen.getByRole("tab", { name: "Tab One" })).toHaveAttribute("aria-selected", "true");
  });

  it("first tab panel is visible by default", () => {
    renderTabs();
    expect(screen.getByText("Content One")).toBeVisible();
  });

  it("other tabs are not selected by default", () => {
    renderTabs();
    expect(screen.getByRole("tab", { name: "Tab Two" })).toHaveAttribute("aria-selected", "false");
    expect(screen.getByRole("tab", { name: "Tab Three" })).toHaveAttribute("aria-selected", "false");
  });

  it("switches content when a tab is clicked", async () => {
    const user = userEvent.setup();
    renderTabs();
    await user.click(screen.getByRole("tab", { name: "Tab Two" }));
    expect(screen.getByRole("tab", { name: "Tab Two" })).toHaveAttribute("aria-selected", "true");
  });

  it("shows the selected tab panel after switching", async () => {
    const user = userEvent.setup();
    renderTabs();
    await user.click(screen.getByRole("tab", { name: "Tab Two" }));
    expect(screen.getByText("Content Two")).toBeVisible();
  });

  it("deselects the previous tab after switching", async () => {
    const user = userEvent.setup();
    renderTabs();
    await user.click(screen.getByRole("tab", { name: "Tab Two" }));
    expect(screen.getByRole("tab", { name: "Tab One" })).toHaveAttribute("aria-selected", "false");
  });

  it("calls onSelectionChange when tab is clicked", async () => {
    const user = userEvent.setup();
    const onSelectionChange = vi.fn();
    render(
      <Tabs onSelectionChange={onSelectionChange}>
        <TabList aria-label="Tabs">
          <Tab id="a">A</Tab>
          <Tab id="b">B</Tab>
        </TabList>
        <TabPanel id="a">Panel A</TabPanel>
        <TabPanel id="b">Panel B</TabPanel>
      </Tabs>
    );
    await user.click(screen.getByRole("tab", { name: "B" }));
    expect(onSelectionChange).toHaveBeenCalledWith("b");
  });

  it("renders with a default selected key", () => {
    render(
      <Tabs defaultSelectedKey="tab2">
        <TabList aria-label="Tabs">
          <Tab id="tab1">Tab 1</Tab>
          <Tab id="tab2">Tab 2</Tab>
        </TabList>
        <TabPanel id="tab1">Panel 1</TabPanel>
        <TabPanel id="tab2">Panel 2</TabPanel>
      </Tabs>
    );
    expect(screen.getByRole("tab", { name: "Tab 2" })).toHaveAttribute("aria-selected", "true");
  });
});
