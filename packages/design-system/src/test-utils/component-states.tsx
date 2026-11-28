/**
 * Shared component states for the tests that cover every component.
 */
import type { ReactElement } from "react";
import { expect, vi } from "vitest";
import { act, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { GearIcon } from "@phosphor-icons/react/Gear";

import { Avatar } from "../components/avatar";
import { Badge } from "../components/badge";
import { Button } from "../components/button";
import { Card } from "../components/card";
import { Checkbox } from "../components/checkbox";
import { CheckboxGroup } from "../components/checkbox-group";
import { Disclosure, DisclosureGroup } from "../components/disclosure";
import { Form } from "../components/form";
import { Heading } from "../components/heading";
import { Icon } from "../components/icon";
import { Input } from "../components/input";
import { Link, LinkButton } from "../components/link";
import { Modal } from "../components/modal";
import {
  MobileNavigation,
  Navigation,
  NavigationActions,
  NavigationBrand,
  NavigationInner,
  NavigationLink,
  NavigationLinks,
} from "../components/navigation";
import { NumberField } from "../components/number-field";
import { RadioGroup } from "../components/radio-group";
import { SearchField } from "../components/search-field";
import { Select } from "../components/select";
import { Skeleton, SkeletonCard } from "../components/skeleton";
import { Tab, TabList, TabPanel, Tabs } from "../components/tabs";
import { Text } from "../components/text";
import { Textarea } from "../components/textarea";
import { ToastRegion, toast } from "../components/toast";
import { Tooltip, TooltipTrigger } from "../components/tooltip";

export type ComponentState = {
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

/**
 * Each component folder's states that change its markup, such as disabled,
 * invalid or expanded. The axe test (`a11y.test.tsx`) and the data-part test
 * (`data-parts.test.tsx`) both render every state. Every folder in
 * src/components must have an entry; `a11y.test.tsx` enforces it.
 */
export const componentStates: Record<string, ComponentState[]> = {
  avatar: [
    {
      name: "initials with status",
      render: () => <Avatar initials="JH" status="online" />,
    },
    {
      name: "image",
      render: () => <Avatar src="/avatar.png" alt="James Howell" />,
    },
  ],
  badge: [{ name: "default", render: () => <Badge>New</Badge> }],
  button: [
    { name: "default", render: () => <Button>Save</Button> },
    { name: "disabled", render: () => <Button isDisabled>Save</Button> },
    {
      name: "with media",
      render: () => (
        <Button media={<Icon icon={GearIcon} aria-hidden />}>Settings</Button>
      ),
    },
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
    {
      name: "with image and footer",
      render: () => (
        <Card
          title="Usage"
          image={<span>Chart</span>}
          footer={<span>Updated today</span>}
        >
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
    {
      name: "with description",
      render: () => <Checkbox label="Accept terms" description="You can change this later" />,
    },
  ],
  "checkbox-group": [
    {
      name: "with description and error",
      render: () => (
        <CheckboxGroup
          label="Notifications"
          description="Pick any"
          errorMessage="Pick one"
          isInvalid
        >
          <Checkbox label="Email" value="email" />
          <Checkbox label="SMS" value="sms" />
        </CheckboxGroup>
      ),
    },
  ],
  disclosure: [
    {
      name: "collapsed",
      render: () => <Disclosure title="Details">Panel</Disclosure>,
    },
    {
      name: "expanded",
      render: () => (
        <Disclosure title="Details" defaultExpanded>
          Panel
        </Disclosure>
      ),
      assert: () => expect(screen.getByText("Panel")).toBeVisible(),
    },
    {
      name: "grouped",
      render: () => (
        <DisclosureGroup>
          <Disclosure title="Shipping">Ships in two days.</Disclosure>
          <Disclosure title="Returns">Free for 30 days.</Disclosure>
        </DisclosureGroup>
      ),
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
  icon: [
    { name: "decorative", render: () => <Icon icon={GearIcon} aria-hidden /> },
    {
      name: "custom svg",
      render: () => (
        <Icon viewBox="0 0 24 24" aria-hidden>
          <path d="M4 4h16v16H4z" />
        </Icon>
      ),
    },
  ],
  input: [
    {
      name: "default",
      render: () => <Input label="Email" description="We never share it" />,
    },
    {
      name: "invalid",
      render: () => (
        <Input label="Email" errorMessage="Enter an email" isInvalid />
      ),
    },
    { name: "disabled", render: () => <Input label="Email" isDisabled /> },
  ],
  link: [
    { name: "link", render: () => <Link href="/docs">Docs</Link> },
    {
      name: "link button",
      render: () => <LinkButton href="/signup">Sign up</LinkButton>,
    },
  ],
  modal: [
    {
      name: "open",
      render: () => (
        <Modal
          title="Delete project"
          isOpen
          onOpenChange={vi.fn()}
          footer={<Button>Delete</Button>}
        >
          This can't be undone.
        </Modal>
      ),
      assert: () =>
        expect(
          screen.getByRole("dialog", { name: "Delete project" }),
        ).toBeInTheDocument(),
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
      render: () => (
        <MobileNavigation
          isOpen={false}
          onOpenChange={vi.fn()}
          links={navLinks}
        />
      ),
      assert: () =>
        expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
    },
    {
      // The JSW-121 case: the open menu is a modal dialog.
      name: "mobile menu open",
      render: () => (
        <MobileNavigation isOpen onOpenChange={vi.fn()} links={navLinks} />
      ),
      assert: () =>
        expect(
          screen.getByRole("dialog", { name: "Navigation menu" }),
        ).toBeInTheDocument(),
    },
  ],
  "number-field": [
    {
      name: "default",
      render: () => <NumberField label="Quantity" defaultValue={1} />,
    },
    {
      name: "with description",
      render: () => <NumberField label="Quantity" description="Up to 10" defaultValue={1} />,
    },
  ],
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
    {
      name: "with description and error",
      render: () => (
        <RadioGroup label="Plan" description="Billed monthly" isInvalid errorMessage="Choose a plan">
          <RadioGroup.Item label="Free" value="free" description="Up to 3 projects" />
          <RadioGroup.Item label="Pro" value="pro" />
        </RadioGroup>
      ),
    },
  ],
  "search-field": [
    { name: "default", render: () => <SearchField /> },
    { name: "labelled", render: () => <SearchField label="Search people" /> },
    {
      name: "with description",
      render: () => <SearchField label="Search people" description="By name or email" />,
    },
  ],
  select: [
    {
      name: "with description",
      render: () => (
        <Select label="Fruit" description="Pick one">
          <Select.Item id="apple">Apple</Select.Item>
        </Select>
      ),
    },
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
        await userEvent
          .setup()
          .click(screen.getByRole("button", { name: /Fruit/ }));
        await screen.findByRole("listbox");
      },
      assert: () => expect(screen.getByRole("listbox")).toBeInTheDocument(),
    },
  ],
  skeleton: [
    { name: "default", render: () => <Skeleton /> },
    { name: "card", render: () => <SkeletonCard /> },
  ],
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
    {
      name: "invalid",
      render: () => (
        <Textarea label="Message" errorMessage="Required" isInvalid />
      ),
    },
  ],
  toast: [
    {
      name: "with a visible toast",
      render: () => <ToastRegion />,
      act: async () => {
        act(() => {
          toast({
            title: "Saved",
            description: "Your changes are live.",
            duration: 0,
          });
        });
        await screen.findByText("Saved");
      },
      assert: () =>
        expect(screen.getByText("Your changes are live.")).toBeInTheDocument(),
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
      assert: () =>
        expect(screen.getByRole("tooltip")).toHaveTextContent(
          "More about this setting",
        ),
    },
  ],
};
