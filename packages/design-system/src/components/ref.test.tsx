/**
 * Every component passes `ref` to its root element and keeps its DS_ display
 * name (JSW-127).
 *
 * Jigsaw supports React 19 only, where `ref` is a normal prop on function
 * components, so components take `ref` in their props instead of using the
 * deprecated forwardRef. The ref goes to the element that receives
 * `className` (the root slot).
 */
import { createRef, useEffect, type ReactElement, type Ref } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { GearIcon } from "@phosphor-icons/react/Gear";

import * as DS from "../index";
import { clearAllToastQueues, resetToastRegionMounts } from "./toast/toast.queue";

afterEach(() => {
  clearAllToastQueues();
  resetToastRegionMounts();
  cleanup();
});

/** React Aria's toast region only renders while a toast is showing. */
function ShowToast() {
  useEffect(() => {
    DS.toast({ title: "Saved", duration: 0 });
  }, []);
  return null;
}

/**
 * Exports that render no single root element, so there's nothing for a ref to
 * point at. Keep the reason with each entry.
 */
const NO_REF: Record<string, string> = {
  ThemeContext: "React context, not a component",
  ThemeProvider: "context provider; renders no DOM",
  TooltipTrigger: "React Aria TooltipTrigger renders no element of its own",
  MobileNavigation: "renders a toggle and an overlay; no single root element",
};

type ComponentExport = { displayName?: string };

/** Probe class passed as `className`, so we can check the ref hits the root slot. */
const PROBE = "ds-ref-probe";

/** Components with no `className` prop, so only the ref itself is checked. */
const NO_CLASSNAME: Record<string, string> = {
  "Card.Header": "styled through Card's classNameOverrides.header; no className prop",
};

function componentExports(): [string, ComponentExport][] {
  const top = Object.entries(DS).filter(
    ([name, value]) =>
      /^[A-Z]/.test(name) && (typeof value === "function" || (typeof value === "object" && value !== null && "$$typeof" in value))
  ) as [string, ComponentExport][];
  // Compound sub-components such as Card.Header and Select.Item.
  const statics = top
    .filter(([name]) => !(name in NO_REF))
    .flatMap(([name, value]) =>
    Object.entries(value as object)
      .filter(([key, sub]) => /^[A-Z]/.test(key) && sub && (typeof sub === "function" || typeof sub === "object"))
      .map(([key, sub]) => [`${name}.${key}`, sub as ComponentExport] as [string, ComponentExport])
  );
  return [...top, ...statics];
}

/** Minimal render for each component, passing the ref through. */
const renders: Record<string, (ref: Ref<never>, cn: string) => ReactElement> = {
  Avatar: (ref, cn) => <DS.Avatar ref={ref} className={cn} initials="JH" />,
  Badge: (ref, cn) => <DS.Badge ref={ref} className={cn}>New</DS.Badge>,
  Button: (ref, cn) => <DS.Button ref={ref} className={cn}>Save</DS.Button>,
  Card: (ref, cn) => <DS.Card ref={ref} className={cn}>Content</DS.Card>,
  "Card.Header": (ref) => <DS.Card.Header ref={ref} title="Usage" />,
  Checkbox: (ref, cn) => <DS.Checkbox ref={ref} className={cn} label="Accept" />,
  CheckboxGroup: (ref, cn) => (
    <DS.CheckboxGroup ref={ref} className={cn} label="Options">
      <DS.Checkbox label="A" value="a" />
    </DS.CheckboxGroup>
  ),
  Disclosure: (ref, cn) => (
    <DS.Disclosure ref={ref} className={cn} title="More">
      Panel
    </DS.Disclosure>
  ),
  DisclosureGroup: (ref, cn) => (
    <DS.DisclosureGroup ref={ref} className={cn}>
      <DS.Disclosure title="More">Panel</DS.Disclosure>
    </DS.DisclosureGroup>
  ),
  Form: (ref, cn) => <DS.Form ref={ref} className={cn}>Fields</DS.Form>,
  "Form.Group": (ref, cn) => <DS.Form.Group ref={ref} className={cn} title="Account" />,
  H1: (ref, cn) => <DS.H1 ref={ref} className={cn}>Title</DS.H1>,
  H2: (ref, cn) => <DS.H2 ref={ref} className={cn}>Title</DS.H2>,
  H3: (ref, cn) => <DS.H3 ref={ref} className={cn}>Title</DS.H3>,
  H4: (ref, cn) => <DS.H4 ref={ref} className={cn}>Title</DS.H4>,
  H5: (ref, cn) => <DS.H5 ref={ref} className={cn}>Title</DS.H5>,
  H6: (ref, cn) => <DS.H6 ref={ref} className={cn}>Title</DS.H6>,
  Heading: (ref, cn) => <DS.Heading ref={ref} className={cn}>Title</DS.Heading>,
  Icon: (ref, cn) => <DS.Icon ref={ref} className={cn} icon={GearIcon} aria-hidden />,
  Input: (ref, cn) => <DS.Input ref={ref} className={cn} label="Email" />,
  Link: (ref, cn) => (
    <DS.Link ref={ref} className={cn} href="/docs">
      Docs
    </DS.Link>
  ),
  LinkButton: (ref, cn) => (
    <DS.LinkButton ref={ref} className={cn} href="/signup">
      Sign up
    </DS.LinkButton>
  ),
  ButtonLink: (ref, cn) => (
    <DS.ButtonLink ref={ref} className={cn} href="/signup">
      Sign up
    </DS.ButtonLink>
  ),
  Modal: (ref, cn) => (
    <DS.Modal ref={ref} className={cn} title="Dialog" isOpen onOpenChange={vi.fn()}>
      Body
    </DS.Modal>
  ),
  Navigation: (ref, cn) => <DS.Navigation ref={ref} className={cn} aria-label="Main" />,
  NavigationInner: (ref, cn) => <DS.NavigationInner ref={ref} className={cn} />,
  NavigationBrand: (ref, cn) => <DS.NavigationBrand ref={ref} className={cn}>Jigsaw</DS.NavigationBrand>,
  NavigationLinks: (ref, cn) => <DS.NavigationLinks ref={ref} className={cn} />,
  NavigationLink: (ref, cn) => (
    <DS.NavigationLink ref={ref} className={cn} href="/team">
      Team
    </DS.NavigationLink>
  ),
  NavigationActions: (ref, cn) => <DS.NavigationActions ref={ref} className={cn} />,
  NumberField: (ref, cn) => <DS.NumberField ref={ref} className={cn} label="Quantity" />,
  RadioGroup: (ref, cn) => (
    <DS.RadioGroup ref={ref} className={cn} label="Plan">
      <DS.RadioGroup.Item label="Free" value="free" />
    </DS.RadioGroup>
  ),
  "RadioGroup.Item": (ref, cn) => (
    <DS.RadioGroup label="Plan">
      <DS.RadioGroup.Item ref={ref} className={cn} label="Free" value="free" />
    </DS.RadioGroup>
  ),
  SearchField: (ref, cn) => <DS.SearchField ref={ref} className={cn} label="Search" />,
  Select: (ref, cn) => (
    <DS.Select ref={ref} className={cn} label="Fruit">
      <DS.Select.Item id="apple">Apple</DS.Select.Item>
    </DS.Select>
  ),
  "Select.Item": () => <></>, // checked separately below: items only mount in the open popover
  Skeleton: (ref, cn) => <DS.Skeleton ref={ref} className={cn} />,
  SkeletonText: (ref, cn) => <DS.SkeletonText ref={ref} className={cn} />,
  SkeletonCircle: (ref, cn) => <DS.SkeletonCircle ref={ref} className={cn} />,
  SkeletonCard: (ref, cn) => <DS.SkeletonCard ref={ref} className={cn} />,
  Tabs: (ref, cn) => (
    <DS.Tabs ref={ref} className={cn}>
      <DS.TabList aria-label="Tabs">
        <DS.Tab id="a">A</DS.Tab>
      </DS.TabList>
      <DS.TabPanel id="a">Panel</DS.TabPanel>
    </DS.Tabs>
  ),
  TabList: (ref, cn) => (
    <DS.Tabs>
      <DS.TabList ref={ref} className={cn} aria-label="Tabs">
        <DS.Tab id="a">A</DS.Tab>
      </DS.TabList>
      <DS.TabPanel id="a">Panel</DS.TabPanel>
    </DS.Tabs>
  ),
  Tab: (ref, cn) => (
    <DS.Tabs>
      <DS.TabList aria-label="Tabs">
        <DS.Tab ref={ref} className={cn} id="a">
          A
        </DS.Tab>
      </DS.TabList>
      <DS.TabPanel id="a">Panel</DS.TabPanel>
    </DS.Tabs>
  ),
  TabPanel: (ref, cn) => (
    <DS.Tabs>
      <DS.TabList aria-label="Tabs">
        <DS.Tab id="a">A</DS.Tab>
      </DS.TabList>
      <DS.TabPanel ref={ref} className={cn} id="a">
        Panel
      </DS.TabPanel>
    </DS.Tabs>
  ),
  Text: (ref, cn) => <DS.Text ref={ref} className={cn}>Body</DS.Text>,
  Textarea: (ref, cn) => <DS.Textarea ref={ref} className={cn} label="Message" />,
  ToastRegion: (ref, cn) => (
    <>
      <DS.ToastRegion ref={ref} className={cn} />
      <ShowToast />
    </>
  ),
  Tooltip: (ref, cn) => (
    <DS.TooltipTrigger isOpen>
      <DS.Button>Help</DS.Button>
      <DS.Tooltip ref={ref} className={cn}>Tip</DS.Tooltip>
    </DS.TooltipTrigger>
  ),
};

describe("refs and display names", () => {
  const components = componentExports().filter(([name]) => !(name in NO_REF));

  it.each(componentExports().filter(([name]) => name !== "ThemeContext"))(
    "%s has a DS_ display name",
    (_name, component) => {
      expect(component.displayName).toMatch(/^DS_/);
    }
  );

  it.each(components.filter(([name]) => name !== "Select.Item"))(
    "%s attaches the ref to a DOM element",
    async (name) => {
      const ref = createRef<Element>();
      render(renders[name](ref as Ref<never>, PROBE));
      await waitFor(() => expect(ref.current, `${name} ref`).toBeInstanceOf(Element));
      // The ref must land on the root slot: the element that receives className.
      if (!(name in NO_CLASSNAME)) expect(ref.current, `${name} ref target`).toHaveClass(PROBE);
    }
  );

  it("Card.Header attaches the ref on both render paths (title and custom header)", () => {
    const titleRef = createRef<HTMLDivElement>();
    const headerRef = createRef<HTMLDivElement>();
    render(
      <>
        <DS.Card.Header ref={titleRef} title="Usage" />
        <DS.Card.Header ref={headerRef} header={<span>Custom header</span>} />
      </>
    );
    expect(titleRef.current).toBeInstanceOf(HTMLDivElement);
    expect(headerRef.current).toBeInstanceOf(HTMLDivElement);
    expect(headerRef.current).toHaveTextContent("Custom header");
  });

  it("Modal opened from its trigger attaches the ref to the dialog panel", async () => {
    const ref = createRef<HTMLDivElement>();
    render(
      <DS.Modal ref={ref} className={PROBE} title="Dialog" trigger={<DS.Button>Open</DS.Button>}>
        Body
      </DS.Modal>
    );
    expect(ref.current).toBeNull();
    await userEvent.setup().click(screen.getByRole("button", { name: "Open" }));
    await waitFor(() => expect(ref.current).toHaveClass(PROBE));
    expect(ref.current).toContainElement(screen.getByRole("dialog", { name: "Dialog" }));
  });

  it("Select.Item attaches the ref to its option in the open listbox", async () => {
    const ref = createRef<Element>();
    render(
      <DS.Select label="Fruit" defaultOpen>
        <DS.Select.Item ref={ref as Ref<never>} id="apple">
          Apple
        </DS.Select.Item>
      </DS.Select>
    );
    expect(ref.current).toBeInstanceOf(Element);
    expect(ref.current).toHaveAttribute("role", "option");
  });

  it("has a render case for every component that takes a ref", () => {
    expect(components.map(([name]) => name).sort()).toEqual(Object.keys(renders).sort());
  });

  it("exempts only exports that still exist", () => {
    const names = componentExports().map(([name]) => name);
    for (const name of Object.keys(NO_REF)) expect(names).toContain(name);
  });
});
