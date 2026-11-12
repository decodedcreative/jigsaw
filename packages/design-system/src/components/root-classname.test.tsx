import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup, act } from "@testing-library/react";
import type { ReactElement } from "react";
import { Avatar } from "./avatar";
import { Button } from "./button";
import { Form } from "./form";
import { Modal } from "./modal";
import {
  Navigation,
  NavigationActions,
  NavigationBrand,
  NavigationInner,
  NavigationLink,
  NavigationLinks,
} from "./navigation";
import { RadioGroup } from "./radio-group";
import { Select } from "./select";
import { Tab, TabList, TabPanel, Tabs } from "./tabs";
import { ToastRegion } from "./toast/sub-components/ToastRegion";
import { toast } from "./toast";
import { clearAllToastQueues, resetToastRegionMounts } from "./toast/toast.queue";

afterEach(() => {
  clearAllToastQueues();
  resetToastRegionMounts();
  cleanup();
});

/**
 * Consistent root styling contract (JSW-118), for components converted in this change.
 * Presentational components are covered in presentational-classname.test.tsx and the
 * original JSW-7 interactive components in their own tests.
 *
 * For every component: `className` lands on the root element, and is merged after
 * `classNameOverrides.component` so it wins conflicts.
 */
type Case = {
  name: string;
  render: (props: { className: string; classNameOverrides: { component: string } }) => ReactElement;
  /** Locate the root element after render. */
  root: () => Element;
};

const tabsTree = (slot: "tabs" | "list" | "tab" | "panel", props: Parameters<Case["render"]>[0]) => (
  <Tabs {...(slot === "tabs" ? props : {})} data-testid="root-tabs">
    <TabList aria-label="Tabs" {...(slot === "list" ? props : {})}>
      <Tab id="one" {...(slot === "tab" ? props : {})}>
        One
      </Tab>
    </TabList>
    <TabPanel id="one" {...(slot === "panel" ? props : {})}>
      Panel
    </TabPanel>
  </Tabs>
);

const cases: Case[] = [
  {
    name: "Avatar",
    render: (p) => <Avatar initials="JH" data-testid="root" {...p} />,
    root: () => screen.getByTestId("root"),
  },
  {
    name: "Button",
    render: (p) => <Button {...p}>Save</Button>,
    root: () => screen.getByRole("button", { name: "Save" }),
  },
  {
    name: "Form",
    render: (p) => <Form aria-label="Form" data-testid="root" {...p} />,
    root: () => screen.getByTestId("root"),
  },
  {
    name: "Form.Group",
    render: (p) => <Form.Group title="Details" data-testid="root" {...p} />,
    root: () => screen.getByTestId("root"),
  },
  {
    name: "Tabs",
    render: (p) => tabsTree("tabs", p),
    root: () => screen.getByTestId("root-tabs"),
  },
  {
    name: "TabList",
    render: (p) => tabsTree("list", p),
    root: () => screen.getByRole("tablist"),
  },
  {
    name: "Tab",
    render: (p) => tabsTree("tab", p),
    root: () => screen.getByRole("tab"),
  },
  {
    name: "TabPanel",
    render: (p) => tabsTree("panel", p),
    root: () => screen.getByRole("tabpanel"),
  },
  {
    name: "Modal (root is the backdrop)",
    render: (p) => (
      <Modal title="Dialog" isOpen onOpenChange={() => {}} {...p}>
        Body
      </Modal>
    ),
    root: () => screen.getByRole("dialog").closest('[class*="bg-black/50"]')!,
  },
  {
    name: "Navigation",
    render: (p) => <Navigation aria-label="Main" {...p} />,
    root: () => screen.getByRole("navigation"),
  },
  {
    name: "NavigationInner",
    render: (p) => <NavigationInner data-testid="root" {...p} />,
    root: () => screen.getByTestId("root"),
  },
  {
    name: "NavigationLinks",
    render: (p) => <NavigationLinks data-testid="root" {...p} />,
    root: () => screen.getByTestId("root"),
  },
  {
    name: "NavigationActions",
    render: (p) => <NavigationActions data-testid="root" {...p} />,
    root: () => screen.getByTestId("root"),
  },
  {
    name: "NavigationBrand",
    render: (p) => <NavigationBrand {...p}>Brand</NavigationBrand>,
    root: () => screen.getByRole("link", { name: "Brand" }),
  },
  {
    name: "NavigationLink",
    render: (p) => (
      <NavigationLink href="/a" {...p}>
        A
      </NavigationLink>
    ),
    root: () => screen.getByRole("link", { name: "A" }),
  },
  {
    name: "RadioGroup.Item",
    render: ({ className }) => (
      <RadioGroup label="Pick" classNameOverrides={{ item: { component: "mt-2 ring-2" } }}>
        <RadioGroup.Item value="a" label="A" className={className} data-testid="root" />
      </RadioGroup>
    ),
    root: () => screen.getByTestId("root"),
  },
  {
    name: "Select.Item",
    render: ({ className }) => (
      <Select label="Fruit" defaultOpen classNameOverrides={{ item: "mt-2 ring-2" }}>
        <Select.Item id="apple" className={className}>
          Apple
        </Select.Item>
      </Select>
    ),
    root: () => screen.getByRole("option", { name: "Apple" }),
  },
];

describe.each(cases)("$name root className", ({ render: renderCase, root }) => {
  it("merges className after classNameOverrides.component (className wins)", () => {
    render(renderCase({ className: "mt-8", classNameOverrides: { component: "mt-2 ring-2" } }));
    const el = root();
    expect(el).toHaveClass("mt-8", "ring-2");
    expect(el).not.toHaveClass("mt-2");
  });
});

describe("ToastRegion root className", () => {
  it("merges className after classNameOverrides.component (className wins)", () => {
    render(<ToastRegion className="mt-8" classNameOverrides={{ component: "mt-2 ring-2" }} />);
    act(() => {
      toast({ title: "Hello", duration: 0 });
    });
    const region = screen.getByRole("alertdialog").closest('[role="region"]')!;
    expect(region).toHaveClass("mt-8", "ring-2");
    expect(region).not.toHaveClass("mt-2");
  });
});
