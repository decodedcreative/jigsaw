import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { Caption, Detail, Notice, SectionLabel, Stat, Subheading, Title } from "./Text.aliases";

afterEach(() => {
  cleanup();
});

describe("Text presets", () => {
  it("renders Subheading with secondary small text", () => {
    const { container } = render(<Subheading>Subtitle</Subheading>);
    expect(container.firstChild).toHaveClass("text-sm", "text-foreground-secondary");
  });

  it("renders Notice with medium base text", () => {
    const { container } = render(<Notice>Empty state</Notice>);
    expect(container.firstChild).toHaveClass("text-base", "font-medium", "text-foreground-primary");
  });

  it("renders Caption with extra-small secondary text", () => {
    const { container } = render(<Caption>Helper</Caption>);
    expect(container.firstChild).toHaveClass("text-xs", "text-foreground-secondary");
  });

  it("renders Detail with extra-small muted text", () => {
    const { container } = render(<Detail>2 hours ago</Detail>);
    expect(container.firstChild).toHaveClass("text-xs", "text-foreground-muted");
  });

  it("renders SectionLabel with uppercase tracking", () => {
    const { container } = render(<SectionLabel>Today</SectionLabel>);
    expect(container.firstChild).toHaveClass("uppercase", "tracking-wider");
  });

  it("renders Title with medium small text", () => {
    const { container } = render(<Title>Row title</Title>);
    expect(container.firstChild).toHaveClass("text-sm", "font-medium");
  });

  it("renders Stat with large bold text", () => {
    const { container } = render(<Stat>42</Stat>);
    expect(container.firstChild).toHaveClass("text-2xl", "font-bold");
  });

  it("renders children", () => {
    render(<Subheading>Page subtitle</Subheading>);
    expect(screen.getByText("Page subtitle")).toBeInTheDocument();
  });
});
