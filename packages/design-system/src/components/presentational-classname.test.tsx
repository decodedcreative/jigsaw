import { describe, it, expect, afterEach } from "vitest";
import { render, cleanup } from "@testing-library/react";
import type { ReactElement } from "react";
import { GearIcon } from "@phosphor-icons/react";
import { Badge } from "./badge/Badge";
import { Card } from "./card/Card";
import { Heading } from "./heading/Heading";
import { H3 } from "./heading/Heading.aliases";
import { Icon } from "./icon/Icon";
import { Skeleton, SkeletonCard, SkeletonText } from "./skeleton/Skeleton";
import { Text } from "./text/Text";

afterEach(() => {
  cleanup();
});

/**
 * JSW-118: presentational components accept a root `className` alongside
 * `classNameOverrides`. Consumer classes are merged last via twMerge, so they
 * add to — and win conflicts against — the component's own root classes.
 *
 * Each case: a render fn, a default root class that must survive, and a default
 * root class that a conflicting consumer class should replace.
 */
type Case = {
  name: string;
  render: (className?: string, overrides?: { component?: string }) => ReactElement;
  keeps: string;
  conflict: { default: string; consumer: string };
};

const cases: Case[] = [
  {
    name: "Text",
    render: (className, overrides) => (
      <Text className={className} classNameOverrides={overrides}>
        Body
      </Text>
    ),
    keeps: "font-normal",
    conflict: { default: "text-base", consumer: "text-lg" },
  },
  {
    name: "Heading",
    render: (className, overrides) => (
      <Heading className={className} classNameOverrides={overrides}>
        Title
      </Heading>
    ),
    keeps: "font-bold",
    conflict: { default: "text-2xl", consumer: "text-4xl" },
  },
  {
    name: "H3 alias",
    render: (className, overrides) => (
      <H3 className={className} classNameOverrides={overrides}>
        Title
      </H3>
    ),
    keeps: "font-semibold",
    conflict: { default: "text-xl", consumer: "text-4xl" },
  },
  {
    name: "Badge",
    render: (className, overrides) => (
      <Badge className={className} classNameOverrides={overrides}>
        New
      </Badge>
    ),
    keeps: "rounded-full",
    conflict: { default: "inline-flex", consumer: "flex" },
  },
  {
    name: "Skeleton",
    render: (className, overrides) => (
      <Skeleton className={className} classNameOverrides={overrides} />
    ),
    keeps: "animate-pulse",
    conflict: { default: "rounded", consumer: "rounded-none" },
  },
  {
    name: "SkeletonText",
    render: (className, overrides) => (
      <SkeletonText className={className} classNameOverrides={overrides} />
    ),
    keeps: "animate-pulse",
    conflict: { default: "h-4", consumer: "h-6" },
  },
  {
    name: "SkeletonCard",
    render: (className, overrides) => (
      <SkeletonCard className={className} classNameOverrides={overrides} />
    ),
    keeps: "space-y-3",
    conflict: { default: "space-y-3", consumer: "space-y-6" },
  },
  {
    name: "Card",
    render: (className, overrides) => (
      <Card className={className} classNameOverrides={overrides}>
        Content
      </Card>
    ),
    keeps: "border-border-primary",
    conflict: { default: "rounded-lg", consumer: "rounded-none" },
  },
  {
    name: "Icon (Phosphor)",
    render: (className, overrides) => (
      <Icon icon={GearIcon} className={className} classNameOverrides={overrides} />
    ),
    keeps: "shrink-0",
    conflict: { default: "h-4", consumer: "h-8" },
  },
  {
    name: "Icon (custom SVG)",
    render: (className, overrides) => (
      <Icon viewBox="0 0 24 24" className={className} classNameOverrides={overrides}>
        <path d="M0 0h24v24H0z" />
      </Icon>
    ),
    keeps: "shrink-0",
    conflict: { default: "h-4", consumer: "h-8" },
  },
];

describe.each(cases)("$name className", ({ render: renderCase, keeps, conflict }) => {
  const root = (ui: ReactElement) => render(ui).container.firstElementChild!;

  it("adds consumer classes without dropping the component's own classes", () => {
    const el = root(renderCase("mt-4 col-span-2"));
    expect(el).toHaveClass("mt-4", "col-span-2", keeps);
  });

  it("lets a conflicting consumer class replace the default", () => {
    const el = root(renderCase(conflict.consumer));
    expect(el).toHaveClass(conflict.consumer);
    expect(el).not.toHaveClass(conflict.default);
  });

  it("applies className after classNameOverrides.component", () => {
    const el = root(renderCase("mt-8", { component: "mt-2 ring-2" }));
    expect(el).toHaveClass("mt-8", "ring-2");
    expect(el).not.toHaveClass("mt-2");
  });

  it("renders unchanged when className is omitted", () => {
    const el = root(renderCase());
    expect(el).toHaveClass(keeps, conflict.default);
  });
});
