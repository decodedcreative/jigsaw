/**
 * Every component passes `ref` to its root element and keeps its DS_ display
 * name (JSW-127).
 *
 * Jigsaw supports React 19 only, where `ref` is a normal prop on function
 * components, so components take `ref` in their props instead of using the
 * deprecated forwardRef. The ref goes to the element that receives
 * `className` (the root slot). The root also keeps its own `data-scope` and
 * `data-part` when an app passes its own (JSW-132).
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

/** The props each render passes to the component's root. */
type RootProps = { className: string; "data-scope"?: string; "data-part"?: string };

/**
 * An app's own `data-scope` and `data-part`. Components spread their part
 * props after the app's, as `getPartProps` documents, so these never reach
 * the root.
 */
const APP_DATA = { "data-scope": "app", "data-part": "app" };

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
const renders: Record<string, (ref: Ref<never>, root: RootProps) => ReactElement> = {
  Avatar: (ref, root) => <DS.Avatar ref={ref} {...root} initials="JH" />,
  Badge: (ref, root) => <DS.Badge ref={ref} {...root}>New</DS.Badge>,
  Button: (ref, root) => <DS.Button ref={ref} {...root}>Save</DS.Button>,
  Card: (ref, root) => <DS.Card ref={ref} {...root}>Content</DS.Card>,
  "Card.Header": (ref) => <DS.Card.Header ref={ref} title="Usage" />,
  Checkbox: (ref, root) => <DS.Checkbox ref={ref} {...root} label="Accept" />,
  CheckboxGroup: (ref, root) => (
    <DS.CheckboxGroup ref={ref} {...root} label="Options">
      <DS.Checkbox label="A" value="a" />
    </DS.CheckboxGroup>
  ),
  Disclosure: (ref, root) => (
    <DS.Disclosure ref={ref} {...root} title="More">
      Panel
    </DS.Disclosure>
  ),
  DisclosureGroup: (ref, root) => (
    <DS.DisclosureGroup ref={ref} {...root}>
      <DS.Disclosure title="More">Panel</DS.Disclosure>
    </DS.DisclosureGroup>
  ),
  Form: (ref, root) => <DS.Form ref={ref} {...root}>Fields</DS.Form>,
  "Form.Group": (ref, root) => <DS.Form.Group ref={ref} {...root} title="Account" />,
  H1: (ref, root) => <DS.H1 ref={ref} {...root}>Title</DS.H1>,
  H2: (ref, root) => <DS.H2 ref={ref} {...root}>Title</DS.H2>,
  H3: (ref, root) => <DS.H3 ref={ref} {...root}>Title</DS.H3>,
  H4: (ref, root) => <DS.H4 ref={ref} {...root}>Title</DS.H4>,
  H5: (ref, root) => <DS.H5 ref={ref} {...root}>Title</DS.H5>,
  H6: (ref, root) => <DS.H6 ref={ref} {...root}>Title</DS.H6>,
  Heading: (ref, root) => <DS.Heading ref={ref} {...root}>Title</DS.Heading>,
  Icon: (ref, root) => <DS.Icon ref={ref} {...root} icon={GearIcon} aria-hidden />,
  Input: (ref, root) => <DS.Input ref={ref} {...root} label="Email" />,
  Link: (ref, root) => (
    <DS.Link ref={ref} {...root} href="/docs">
      Docs
    </DS.Link>
  ),
  LinkButton: (ref, root) => (
    <DS.LinkButton ref={ref} {...root} href="/signup">
      Sign up
    </DS.LinkButton>
  ),
  ButtonLink: (ref, root) => (
    <DS.ButtonLink ref={ref} {...root} href="/signup">
      Sign up
    </DS.ButtonLink>
  ),
  Modal: (ref, root) => (
    <DS.Modal ref={ref} {...root} title="Dialog" isOpen onOpenChange={vi.fn()}>
      Body
    </DS.Modal>
  ),
  Navigation: (ref, root) => <DS.Navigation ref={ref} {...root} aria-label="Main" />,
  NavigationInner: (ref, root) => <DS.NavigationInner ref={ref} {...root} />,
  NavigationBrand: (ref, root) => <DS.NavigationBrand ref={ref} {...root}>Jigsaw</DS.NavigationBrand>,
  NavigationLinks: (ref, root) => <DS.NavigationLinks ref={ref} {...root} />,
  NavigationLink: (ref, root) => (
    <DS.NavigationLink ref={ref} {...root} href="/team">
      Team
    </DS.NavigationLink>
  ),
  NavigationActions: (ref, root) => <DS.NavigationActions ref={ref} {...root} />,
  NumberField: (ref, root) => <DS.NumberField ref={ref} {...root} label="Quantity" />,
  RadioGroup: (ref, root) => (
    <DS.RadioGroup ref={ref} {...root} label="Plan">
      <DS.RadioGroup.Item label="Free" value="free" />
    </DS.RadioGroup>
  ),
  "RadioGroup.Item": (ref, root) => (
    <DS.RadioGroup label="Plan">
      <DS.RadioGroup.Item ref={ref} {...root} label="Free" value="free" />
    </DS.RadioGroup>
  ),
  SearchField: (ref, root) => <DS.SearchField ref={ref} {...root} label="Search" />,
  Select: (ref, root) => (
    <DS.Select ref={ref} {...root} label="Fruit">
      <DS.Select.Item id="apple">Apple</DS.Select.Item>
    </DS.Select>
  ),
  "Select.Item": () => <></>, // checked separately below: items only mount in the open popover
  Skeleton: (ref, root) => <DS.Skeleton ref={ref} {...root} />,
  SkeletonText: (ref, root) => <DS.SkeletonText ref={ref} {...root} />,
  SkeletonCircle: (ref, root) => <DS.SkeletonCircle ref={ref} {...root} />,
  SkeletonCard: (ref, root) => <DS.SkeletonCard ref={ref} {...root} />,
  Tabs: (ref, root) => (
    <DS.Tabs ref={ref} {...root}>
      <DS.TabList aria-label="Tabs">
        <DS.Tab id="a">A</DS.Tab>
      </DS.TabList>
      <DS.TabPanel id="a">Panel</DS.TabPanel>
    </DS.Tabs>
  ),
  TabList: (ref, root) => (
    <DS.Tabs>
      <DS.TabList ref={ref} {...root} aria-label="Tabs">
        <DS.Tab id="a">A</DS.Tab>
      </DS.TabList>
      <DS.TabPanel id="a">Panel</DS.TabPanel>
    </DS.Tabs>
  ),
  Tab: (ref, root) => (
    <DS.Tabs>
      <DS.TabList aria-label="Tabs">
        <DS.Tab ref={ref} {...root} id="a">
          A
        </DS.Tab>
      </DS.TabList>
      <DS.TabPanel id="a">Panel</DS.TabPanel>
    </DS.Tabs>
  ),
  TabPanel: (ref, root) => (
    <DS.Tabs>
      <DS.TabList aria-label="Tabs">
        <DS.Tab id="a">A</DS.Tab>
      </DS.TabList>
      <DS.TabPanel ref={ref} {...root} id="a">
        Panel
      </DS.TabPanel>
    </DS.Tabs>
  ),
  Text: (ref, root) => <DS.Text ref={ref} {...root}>Body</DS.Text>,
  Textarea: (ref, root) => <DS.Textarea ref={ref} {...root} label="Message" />,
  ToastRegion: (ref, root) => (
    <>
      <DS.ToastRegion ref={ref} {...root} />
      <ShowToast />
    </>
  ),
  Tooltip: (ref, root) => (
    <DS.TooltipTrigger isOpen>
      <DS.Button>Help</DS.Button>
      <DS.Tooltip ref={ref} {...root}>Tip</DS.Tooltip>
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
      render(renders[name](ref as Ref<never>, { className: PROBE }));
      await waitFor(() => expect(ref.current, `${name} ref`).toBeInstanceOf(Element));
      // The ref must land on the root slot: the element that receives className.
      if (!(name in NO_CLASSNAME)) expect(ref.current, `${name} ref target`).toHaveClass(PROBE);
    }
  );

  it.each(components.filter(([name]) => name !== "Select.Item"))(
    "%s keeps its own data-scope and data-part when an app passes its own",
    async (name) => {
      const ref = createRef<Element>();
      render(renders[name](ref as Ref<never>, { className: PROBE, ...APP_DATA }));
      await waitFor(() => expect(ref.current, `${name} ref`).toBeInstanceOf(Element));
      expect(ref.current?.getAttribute("data-scope"), `${name} data-scope`).not.toBe("app");
      expect(ref.current?.getAttribute("data-part"), `${name} data-part`).not.toBe("app");
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
