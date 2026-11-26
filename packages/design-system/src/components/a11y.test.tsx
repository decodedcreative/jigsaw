/**
 * axe accessibility checks for every component, in its main states (JSW-122).
 *
 * Interactive components are also checked open or expanded. Content that
 * portals outside the render container (Modal, Select popover, Tooltip,
 * MobileNavigation, toasts) is checked by running axe on `document.body`.
 *
 * Rule configuration and exceptions live in `src/test-utils/axe.ts`.
 * Colour contrast is off here (jsdom has no layout) and is covered by the
 * Storybook story tests in Chromium.
 */
import { readdirSync, existsSync } from "node:fs";
import path from "node:path";
import type { ReactElement } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { act, cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { GearIcon } from "@phosphor-icons/react/Gear";

import { expectNoAxeViolations } from "../test-utils/axe";
import { Avatar } from "./avatar";
import { Badge } from "./badge";
import { Button } from "./button";
import { Card } from "./card";
import { Checkbox } from "./checkbox";
import { CheckboxGroup } from "./checkbox-group";
import { Disclosure } from "./disclosure";
import { Form } from "./form";
import { Heading } from "./heading";
import { Icon } from "./icon";
import { Input } from "./input";
import { Link, LinkButton } from "./link";
import { Modal } from "./modal";
import {
  MobileNavigation,
  Navigation,
  NavigationActions,
  NavigationBrand,
  NavigationInner,
  NavigationLink,
  NavigationLinks,
} from "./navigation";
import { NumberField } from "./number-field";
import { RadioGroup } from "./radio-group";
import { SearchField } from "./search-field";
import { Select } from "./select";
import { Skeleton } from "./skeleton";
import { Tab, TabList, TabPanel, Tabs } from "./tabs";
import { Text } from "./text";
import { Textarea } from "./textarea";
import { ToastRegion, toast } from "./toast";
import { clearAllToastQueues, resetToastRegionMounts } from "./toast/toast.queue";
import { Tooltip, TooltipTrigger } from "./tooltip";

afterEach(() => {
  clearAllToastQueues();
  resetToastRegionMounts();
  cleanup();
});

type AxeCase = {
  name: string;
  render: () => ReactElement;
  /** Put the component into the state under test (open, expanded, …). */
  act?: () => Promise<void>;
  /** Assert the state under test is really on screen, so axe can't pass on the wrong state. */
  assert?: () => void;
};

const navLinks = [
  { href: "/dashboard", label: "Dashboard", isCurrent: true },
  { href: "/team", label: "Team" },
];

/** Every folder in src/components must have an entry (enforced below). */
const cases: Record<string, AxeCase[]> = {
  avatar: [
    { name: "initials with status", render: () => <Avatar initials="JH" status="online" /> },
    { name: "image", render: () => <Avatar src="/avatar.png" alt="James Howell" /> },
  ],
  badge: [{ name: "default", render: () => <Badge>New</Badge> }],
  button: [
    { name: "default", render: () => <Button>Save</Button> },
    { name: "disabled", render: () => <Button isDisabled>Save</Button> },
  ],
  card: [
    {
      name: "with header",
      render: () => (
        <Card>
          <Card.Header title="Usage" description="This month" />
          Content
        </Card>
      ),
    },
  ],
  checkbox: [
    { name: "unchecked", render: () => <Checkbox label="Accept terms" /> },
    {
      name: "checked",
      render: () => <Checkbox label="Accept terms" defaultSelected />,
      assert: () => expect(screen.getByRole("checkbox")).toBeChecked(),
    },
  ],
  "checkbox-group": [
    {
      name: "with description and error",
      render: () => (
        <CheckboxGroup label="Notifications" description="Pick any" errorMessage="Pick one" isInvalid>
          <Checkbox label="Email" value="email" />
          <Checkbox label="SMS" value="sms" />
        </CheckboxGroup>
      ),
    },
  ],
  disclosure: [
    { name: "collapsed", render: () => <Disclosure title="Details">Panel</Disclosure> },
    {
      name: "expanded",
      render: () => (
        <Disclosure title="Details" defaultExpanded>
          Panel
        </Disclosure>
      ),
      assert: () => expect(screen.getByText("Panel")).toBeVisible(),
    },
  ],
  form: [
    {
      name: "with groups and fields",
      render: () => (
        <Form aria-label="Profile">
          <Form.Group title="Account" titleAs="h2">
            <Input label="Username" />
            <Textarea label="Bio" />
          </Form.Group>
        </Form>
      ),
    },
  ],
  heading: [{ name: "h2", render: () => <Heading as="h2">Section</Heading> }],
  icon: [{ name: "decorative", render: () => <Icon icon={GearIcon} aria-hidden /> }],
  input: [
    { name: "default", render: () => <Input label="Email" description="We never share it" /> },
    { name: "invalid", render: () => <Input label="Email" errorMessage="Enter an email" isInvalid /> },
    { name: "disabled", render: () => <Input label="Email" isDisabled /> },
  ],
  link: [
    { name: "link", render: () => <Link href="/docs">Docs</Link> },
    { name: "link button", render: () => <LinkButton href="/signup">Sign up</LinkButton> },
  ],
  modal: [
    {
      name: "open",
      render: () => (
        <Modal title="Delete project" isOpen onOpenChange={vi.fn()} footer={<Button>Delete</Button>}>
          This can't be undone.
        </Modal>
      ),
      assert: () => expect(screen.getByRole("dialog", { name: "Delete project" })).toBeInTheDocument(),
    },
  ],
  navigation: [
    {
      name: "desktop",
      render: () => (
        <Navigation aria-label="Main">
          <NavigationInner>
            <NavigationBrand href="/">Jigsaw</NavigationBrand>
            <NavigationLinks>
              <NavigationLink href="/dashboard" isCurrent>
                Dashboard
              </NavigationLink>
              <NavigationLink href="/team">Team</NavigationLink>
            </NavigationLinks>
            <NavigationActions>
              <Button>Sign in</Button>
            </NavigationActions>
          </NavigationInner>
        </Navigation>
      ),
    },
    {
      name: "mobile menu closed",
      render: () => <MobileNavigation isOpen={false} onOpenChange={vi.fn()} links={navLinks} />,
      assert: () => expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
    },
    {
      // The JSW-121 case: the open menu is a modal dialog.
      name: "mobile menu open",
      render: () => <MobileNavigation isOpen onOpenChange={vi.fn()} links={navLinks} />,
      assert: () => expect(screen.getByRole("dialog", { name: "Navigation menu" })).toBeInTheDocument(),
    },
  ],
  "number-field": [{ name: "default", render: () => <NumberField label="Quantity" defaultValue={1} /> }],
  "radio-group": [
    {
      name: "with selection",
      render: () => (
        <RadioGroup label="Plan" defaultValue="pro">
          <RadioGroup.Item label="Free" value="free" />
          <RadioGroup.Item label="Pro" value="pro" />
        </RadioGroup>
      ),
    },
  ],
  "search-field": [
    { name: "default", render: () => <SearchField /> },
    { name: "labelled", render: () => <SearchField label="Search people" /> },
  ],
  select: [
    {
      name: "closed",
      render: () => (
        <Select label="Fruit">
          <Select.Item id="apple">Apple</Select.Item>
          <Select.Item id="banana">Banana</Select.Item>
        </Select>
      ),
    },
    {
      name: "open",
      render: () => (
        <Select label="Fruit">
          <Select.Item id="apple">Apple</Select.Item>
          <Select.Item id="banana">Banana</Select.Item>
        </Select>
      ),
      act: async () => {
        await userEvent.setup().click(screen.getByRole("button", { name: /Fruit/ }));
        await screen.findByRole("listbox");
      },
      assert: () => expect(screen.getByRole("listbox")).toBeInTheDocument(),
    },
  ],
  skeleton: [{ name: "default", render: () => <Skeleton /> }],
  tabs: [
    {
      name: "default",
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
    },
  ],
  text: [{ name: "default", render: () => <Text>Body copy</Text> }],
  textarea: [
    { name: "default", render: () => <Textarea label="Message" /> },
    { name: "invalid", render: () => <Textarea label="Message" errorMessage="Required" isInvalid /> },
  ],
  toast: [
    {
      name: "with a visible toast",
      render: () => <ToastRegion />,
      act: async () => {
        act(() => {
          toast({ title: "Saved", description: "Your changes are live.", duration: 0 });
        });
        await screen.findByText("Saved");
      },
      assert: () => expect(screen.getByText("Your changes are live.")).toBeInTheDocument(),
    },
  ],
  tooltip: [
    {
      name: "shown",
      render: () => (
        <TooltipTrigger isOpen>
          <Button>Help</Button>
          <Tooltip>More about this setting</Tooltip>
        </TooltipTrigger>
      ),
      assert: () => expect(screen.getByRole("tooltip")).toHaveTextContent("More about this setting"),
    },
  ],
};

describe("axe", () => {
  for (const [component, componentCases] of Object.entries(cases)) {
    describe(component, () => {
      it.each(componentCases)("$name has no violations", async (testCase) => {
        render(testCase.render());
        if (testCase.act) await testCase.act();
        if (testCase.assert) await waitFor(testCase.assert);
        await expectNoAxeViolations(document.body);
      });
    });
  }

  // Guard: every folder in src/components with an index.ts must have an entry
  // in `cases`, so a new component can't ship without axe checks.
  it("covers every component folder", () => {
    const componentsDir = path.join(__dirname);
    const folders = readdirSync(componentsDir, { withFileTypes: true })
      .filter((entry) => entry.isDirectory() && existsSync(path.join(componentsDir, entry.name, "index.ts")))
      .map((entry) => entry.name)
      .sort();
    expect(Object.keys(cases).sort()).toEqual(folders);
  });

  it("fails on a real violation", async () => {
    render(<button type="button" />);
    await expect(expectNoAxeViolations(document.body)).rejects.toThrow(/button-name/);
  });
});
