/**
 * The phrase a screen reader announces for each control state that changes the
 * markup (JSW-128), e.g. "button, Continue, disabled". Built by announce() from
 * the computed role, accessible name and ARIA states.
 *
 * A change here changes what assistive technology users hear, so update an
 * expectation only when that change is intended.
 */
import type { ReactElement } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { announce } from "../test-utils/announce";
import { Button } from "./button";
import { Checkbox } from "./checkbox";
import { Disclosure } from "./disclosure";
import { Input } from "./input";
import { Link, LinkButton } from "./link";
import { Modal } from "./modal";
import { MobileNavigation, NavigationLink } from "./navigation";
import { NumberField } from "./number-field";
import { RadioGroup } from "./radio-group";
import { SearchField } from "./search-field";
import { Select } from "./select";
import { Tab, TabList, TabPanel, Tabs } from "./tabs";
import { Textarea } from "./textarea";
import { Tooltip, TooltipTrigger } from "./tooltip";

afterEach(() => cleanup());

type AnnounceCase = {
  name: string;
  render: () => ReactElement;
  /** Selector for the element(s) assistive technology lands on. */
  target: string;
  /** Put the control into the state under test. */
  act?: () => Promise<void>;
  expected: string[];
};

const links = [{ href: "/dashboard", label: "Dashboard" }];

const cases: AnnounceCase[] = [
  { name: "Button", render: () => <Button>Save</Button>, target: "button", expected: ["button, Save"] },
  {
    name: "Button disabled",
    render: () => <Button isDisabled>Save</Button>,
    target: "button",
    expected: ["button, Save, disabled"],
  },
  { name: "Link", render: () => <Link href="/docs">Docs</Link>, target: "a", expected: ["link, Docs"] },
  {
    name: "LinkButton",
    render: () => <LinkButton href="/signup">Sign up</LinkButton>,
    target: "a",
    expected: ["link, Sign up"],
  },
  {
    name: "NavigationLink current",
    render: () => (
      <>
        <NavigationLink href="/dashboard" isCurrent>
          Dashboard
        </NavigationLink>
        <NavigationLink href="/team">Team</NavigationLink>
      </>
    ),
    target: "a",
    expected: ["link, Dashboard, current page", "link, Team"],
  },
  {
    name: "Checkbox unchecked",
    render: () => <Checkbox label="Accept terms" />,
    target: "input",
    expected: ["checkbox, Accept terms, not checked"],
  },
  {
    name: "Checkbox checked",
    render: () => <Checkbox label="Accept terms" defaultSelected />,
    target: "input",
    expected: ["checkbox, Accept terms, checked"],
  },
  {
    name: "Checkbox indeterminate",
    render: () => <Checkbox label="Select all" isIndeterminate />,
    target: "input",
    expected: ["checkbox, Select all, mixed"],
  },
  {
    name: "Checkbox disabled",
    render: () => <Checkbox label="Accept terms" isDisabled />,
    target: "input",
    expected: ["checkbox, Accept terms, not checked, disabled"],
  },
  {
    name: "Checkbox invalid",
    render: () => <Checkbox label="Accept terms" isInvalid />,
    target: "input",
    expected: ["checkbox, Accept terms, not checked, invalid"],
  },
  {
    name: "RadioGroup with a selection",
    render: () => (
      <RadioGroup label="Plan" defaultValue="pro">
        <RadioGroup.Item label="Free" value="free" />
        <RadioGroup.Item label="Pro" value="pro" />
      </RadioGroup>
    ),
    target: "input",
    expected: ["radio, Free, not checked", "radio, Pro, checked"],
  },
  { name: "Input", render: () => <Input label="Email" />, target: "input", expected: ["textbox, Email"] },
  {
    name: "Input required",
    render: () => <Input label="Email" isRequired />,
    target: "input",
    expected: ["textbox, Email, required"],
  },
  {
    name: "Input invalid",
    render: () => <Input label="Email" errorMessage="Enter an email" isInvalid />,
    target: "input",
    expected: ["textbox, Email, invalid"],
  },
  {
    name: "Input disabled",
    render: () => <Input label="Email" isDisabled />,
    target: "input",
    expected: ["textbox, Email, disabled"],
  },
  {
    name: "Input read only",
    render: () => <Input label="Email" isReadOnly />,
    target: "input",
    expected: ["textbox, Email, read only"],
  },
  { name: "Textarea", render: () => <Textarea label="Message" />, target: "textarea", expected: ["textbox, Message"] },
  {
    name: "NumberField",
    render: () => <NumberField label="Quantity" defaultValue={1} />,
    target: "input",
    expected: ["Number field, Quantity"],
  },
  {
    name: "SearchField labelled",
    render: () => <SearchField label="Search people" />,
    target: "input",
    expected: ["searchbox, Search people"],
  },
  {
    name: "SearchField without a label",
    render: () => <SearchField />,
    target: "input",
    expected: ["searchbox, Search"],
  },
  {
    name: "Select collapsed",
    render: () => (
      <Select label="Fruit">
        <Select.Item id="apple">Apple</Select.Item>
      </Select>
    ),
    target: "button",
    expected: ["button, Select an option Fruit, has popup listbox, collapsed"],
  },
  {
    name: "Select with a value",
    render: () => (
      <Select label="Fruit" defaultSelectedKey="apple">
        <Select.Item id="apple">Apple</Select.Item>
      </Select>
    ),
    target: "button",
    expected: ["button, Apple Fruit, has popup listbox, collapsed"],
  },
  {
    name: "Select after choosing an option",
    render: () => (
      <Select label="Fruit">
        <Select.Item id="apple">Apple</Select.Item>
        <Select.Item id="banana">Banana</Select.Item>
      </Select>
    ),
    act: async () => {
      const user = userEvent.setup();
      await user.click(screen.getByRole("button"));
      await user.click(await screen.findByRole("option", { name: "Banana" }));
    },
    target: "button",
    expected: ["button, Banana Fruit, has popup listbox, collapsed"],
  },
  {
    name: "Select open",
    render: () => (
      <Select label="Fruit">
        <Select.Item id="apple">Apple</Select.Item>
      </Select>
    ),
    act: async () => {
      await userEvent.setup().click(screen.getByRole("button"));
      await screen.findByRole("listbox");
    },
    target: '[role="option"]',
    expected: ["option, Apple"],
  },
  {
    name: "Checkbox after clicking it",
    render: () => <Checkbox label="Accept terms" />,
    act: async () => {
      // Clicks the checkbox itself: clicking the label text doesn't toggle it (JSW-139).
      await userEvent.setup().click(screen.getByRole("checkbox"));
    },
    target: "input",
    expected: ["checkbox, Accept terms, checked"],
  },
  {
    name: "Disclosure after clicking its trigger",
    render: () => <Disclosure title="Details">Panel</Disclosure>,
    act: async () => {
      await userEvent.setup().click(screen.getByRole("button", { name: "Details" }));
    },
    target: "button",
    expected: ["button, Details, expanded"],
  },
  {
    name: "Tabs after selecting the second tab",
    render: () => (
      <Tabs>
        <TabList aria-label="Settings">
          <Tab id="profile">Profile</Tab>
          <Tab id="billing">Billing</Tab>
        </TabList>
        <TabPanel id="profile">Profile settings</TabPanel>
        <TabPanel id="billing">Billing settings</TabPanel>
      </Tabs>
    ),
    act: async () => {
      await userEvent.setup().click(screen.getByRole("tab", { name: "Billing" }));
    },
    target: '[role="tab"]',
    expected: ["tab, Profile", "tab, Billing, selected"],
  },
  {
    name: "Disclosure collapsed",
    render: () => <Disclosure title="Details">Panel</Disclosure>,
    target: "button",
    expected: ["button, Details, collapsed"],
  },
  {
    name: "Disclosure expanded",
    render: () => (
      <Disclosure title="Details" defaultExpanded>
        Panel
      </Disclosure>
    ),
    target: "button",
    expected: ["button, Details, expanded"],
  },
  {
    name: "Tabs",
    render: () => (
      <Tabs>
        <TabList aria-label="Settings">
          <Tab id="profile">Profile</Tab>
          <Tab id="billing">Billing</Tab>
        </TabList>
        <TabPanel id="profile">Profile settings</TabPanel>
        <TabPanel id="billing">Billing settings</TabPanel>
      </Tabs>
    ),
    target: '[role="tab"]',
    expected: ["tab, Profile, selected", "tab, Billing"],
  },
  {
    name: "MobileNavigation closed",
    render: () => <MobileNavigation isOpen={false} onOpenChange={vi.fn()} links={links} />,
    target: "button",
    expected: ["button, Toggle menu, collapsed"],
  },
  {
    name: "MobileNavigation open",
    render: () => <MobileNavigation isOpen onOpenChange={vi.fn()} links={links} />,
    target: '[role="dialog"]',
    expected: ["dialog, Navigation menu"],
  },
  {
    name: "Modal open",
    render: () => (
      <Modal title="Delete project" isOpen onOpenChange={vi.fn()}>
        This can't be undone.
      </Modal>
    ),
    target: '[role="dialog"]',
    expected: ["dialog, Delete project"],
  },
  {
    name: "Tooltip shown",
    render: () => (
      <TooltipTrigger isOpen>
        <Button>Help</Button>
        <Tooltip>More about this setting</Tooltip>
      </TooltipTrigger>
    ),
    target: '[role="tooltip"]',
    expected: ["tooltip, More about this setting"],
  },
];

describe("screen reader announcements", () => {
  it.each(cases)("$name", async ({ render: renderCase, target, act, expected }) => {
    render(renderCase());
    if (act) await act();
    const elements = Array.from(document.body.querySelectorAll(target));
    expect(elements.map(announce)).toEqual(expected);
  });
});
