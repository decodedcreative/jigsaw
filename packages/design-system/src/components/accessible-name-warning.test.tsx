/**
 * Every control warns the same way in development when it has no accessible
 * name (JSW-128). See useAccessibleNameWarning.
 */
import type { ReactElement } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, waitFor } from "@testing-library/react";

import { Button } from "./button";
import { Checkbox } from "./checkbox";
import { Input } from "./input";
import { Link, LinkButton } from "./link";
import { NavigationBrand, NavigationLink } from "./navigation";
import { NumberField } from "./number-field";
import { RadioGroup } from "./radio-group";
import { SearchField } from "./search-field";
import { Select } from "./select";
import { Tab, TabList, Tabs } from "./tabs";
import { Textarea } from "./textarea";

afterEach(() => {
  vi.restoreAllMocks();
  cleanup();
});

type NameCase = { component: string; unnamed: () => ReactElement; named: () => ReactElement };

const cases: NameCase[] = [
  { component: "Button", unnamed: () => <Button />, named: () => <Button>Save</Button> },
  {
    component: "Link",
    unnamed: () => <Link href="/docs">{null}</Link>,
    named: () => <Link href="/docs">Docs</Link>,
  },
  {
    component: "LinkButton",
    unnamed: () => <LinkButton href="/signup">{null}</LinkButton>,
    named: () => <LinkButton href="/signup">Sign up</LinkButton>,
  },
  {
    component: "NavigationBrand",
    unnamed: () => <NavigationBrand />,
    named: () => <NavigationBrand>Jigsaw</NavigationBrand>,
  },
  {
    component: "NavigationLink",
    unnamed: () => <NavigationLink href="/team">{null}</NavigationLink>,
    named: () => <NavigationLink href="/team">Team</NavigationLink>,
  },
  { component: "Checkbox", unnamed: () => <Checkbox />, named: () => <Checkbox label="Accept terms" /> },
  {
    component: "RadioGroup.Item",
    unnamed: () => (
      <RadioGroup label="Plan">
        <RadioGroup.Item value="free" />
      </RadioGroup>
    ),
    named: () => (
      <RadioGroup label="Plan">
        <RadioGroup.Item value="free" label="Free" />
      </RadioGroup>
    ),
  },
  { component: "Input", unnamed: () => <Input />, named: () => <Input label="Email" /> },
  { component: "Textarea", unnamed: () => <Textarea />, named: () => <Textarea label="Message" /> },
  { component: "NumberField", unnamed: () => <NumberField />, named: () => <NumberField label="Quantity" /> },
  {
    component: "Select",
    unnamed: () => (
      <Select>
        <Select.Item id="apple">Apple</Select.Item>
      </Select>
    ),
    named: () => (
      <Select label="Fruit">
        <Select.Item id="apple">Apple</Select.Item>
      </Select>
    ),
  },
  {
    component: "Tab",
    unnamed: () => (
      <Tabs>
        <TabList aria-label="Settings">
          <Tab id="a">{null}</Tab>
        </TabList>
      </Tabs>
    ),
    named: () => (
      <Tabs>
        <TabList aria-label="Settings">
          <Tab id="a">Profile</Tab>
        </TabList>
      </Tabs>
    ),
  },
];

const jigsawWarning = (component: string) =>
  `[@jigsaw-ds/design-system] <${component}> has no accessible name`;

/** Let the hook's lazy import resolve and its check run. */
async function flushNameCheck() {
  await import("dom-accessibility-api");
  await new Promise((resolve) => setTimeout(resolve, 0));
}

describe("accessible name warning", () => {
  it.each(cases)("$component warns when it has no accessible name", async ({ component, unnamed }) => {
    // React Aria also warns for some unlabelled fields; only Jigsaw's is asserted.
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    render(unnamed());
    await waitFor(() => expect(warn).toHaveBeenCalledWith(expect.stringContaining(jigsawWarning(component))));
  });

  it.each(cases)("$component doesn't warn when it is named", async ({ component, named }) => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    render(named());
    await flushNameCheck();
    expect(warn).not.toHaveBeenCalledWith(expect.stringContaining(jigsawWarning(component)));
  });

  it("SearchField is named \"Search\" by default, so it doesn't warn", async () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    render(<SearchField />);
    await flushNameCheck();
    expect(warn).not.toHaveBeenCalledWith(expect.stringContaining(jigsawWarning("SearchField")));
  });

  it("counts a name from aria-label, not just visible text", async () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    render(<Button aria-label="Close" />);
    await flushNameCheck();
    expect(warn).not.toHaveBeenCalled();
  });

  it("warns once per element across re-renders", async () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    const { rerender } = render(<Button />);
    await waitFor(() => expect(warn).toHaveBeenCalledTimes(1));
    rerender(<Button variant="secondary" />);
    await flushNameCheck();
    expect(warn).toHaveBeenCalledTimes(1);
  });
});
