import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { H1, H3 } from "./Heading.aliases";
import { Heading } from "./Heading";

afterEach(() => {
  cleanup();
});

describe("Heading", () => {
  it("renders as h2 by default", () => {
    const { container } = render(<Heading>Section title</Heading>);
    expect(container.querySelector("h2")).toBeInTheDocument();
  });

  it("renders the requested semantic element", () => {
    const { container } = render(<Heading as="h1">Page title</Heading>);
    expect(container.querySelector("h1")).toBeInTheDocument();
  });

  it("uses matching visual size when size is omitted", () => {
    const { container } = render(<Heading as="h1">Page title</Heading>);
    expect(container.firstChild).toHaveClass("text-3xl", "font-bold");
  });

  it("allows visual size to differ from semantic level", () => {
    const { container } = render(
      <Heading as="h3" size="h2">
        Card title
      </Heading>
    );
    const heading = container.querySelector("h3");
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveClass("text-2xl", "font-bold");
    expect(heading).not.toHaveClass("text-xl");
  });

  it("renders h3 visual styles", () => {
    const { container } = render(<Heading as="h3">Subsection</Heading>);
    expect(container.firstChild).toHaveClass("text-xl", "font-semibold");
  });

  it("applies muted styles", () => {
    const { container } = render(<Heading muted>Muted heading</Heading>);
    expect(container.firstChild).toHaveClass("text-foreground-secondary");
  });

  it("applies heading font family", () => {
    const { container } = render(<Heading>Title</Heading>);
    expect(container.firstChild).toHaveClass("font-heading");
  });

  it("passes additional HTML attributes", () => {
    render(<Heading data-testid="page-heading">Title</Heading>);
    expect(screen.getByTestId("page-heading")).toBeInTheDocument();
  });

  it("applies custom className via classNameOverrides", () => {
    const { container } = render(
      <Heading classNameOverrides={{ component: ["custom-class"] }}>Title</Heading>
    );
    expect(container.firstChild).toHaveClass("custom-class");
  });
});

describe("Heading aliases", () => {
  it("H1 renders an h1 with h1 visual styles by default", () => {
    const { container } = render(<H1>Page title</H1>);
    const heading = container.querySelector("h1");
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveClass("text-3xl", "font-bold");
  });

  it("H3 alias supports a different visual size", () => {
    const { container } = render(
      <H3 size="h2">
        Card title
      </H3>
    );
    const heading = container.querySelector("h3");
    expect(heading).toHaveClass("text-2xl", "font-bold");
  });
});
