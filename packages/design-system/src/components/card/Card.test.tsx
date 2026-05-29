import { describe, it, expect, afterEach, vi } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import Card from "./Card";

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe("Card", () => {
  it("renders children in the content region", () => {
    render(<Card>Card content</Card>);
    expect(screen.getByText("Card content")).toBeInTheDocument();
  });

  it("does not drop falsy-but-valid children like 0", () => {
    render(<Card>{0}</Card>);
    expect(screen.getByText("0")).toBeInTheDocument();
  });

  it("renders title when provided", () => {
    render(<Card title="My card">Content</Card>);
    expect(screen.getByRole("heading", { name: "My card" })).toBeInTheDocument();
  });

  it("wraps image in the image slot with classNameOverrides", () => {
    const { container } = render(
      <Card
        image={<img alt="Cover" src="/cover.jpg" />}
        classNameOverrides={{ image: ["aspect-video"] }}
      >
        Content
      </Card>
    );
    expect(screen.getByRole("img", { name: "Cover" })).toBeInTheDocument();
    expect(container.querySelector(".aspect-video")).toBeInTheDocument();
  });

  it("applies content classNameOverrides from Card", () => {
    const { container } = render(
      <Card classNameOverrides={{ content: ["p-2"] }}>Main content</Card>
    );
    expect(screen.getByText("Main content")).toBeInTheDocument();
    expect(container.querySelector(".p-2")).toBeInTheDocument();
  });

  it("uses custom header instead of default", () => {
    render(
      <Card title="Ignored" header={<span>Custom header</span>}>
        Content
      </Card>
    );
    expect(screen.getByText("Custom header")).toBeInTheDocument();
    expect(screen.queryByText("Ignored")).not.toBeInTheDocument();
  });

  it("renders footer when provided", () => {
    render(
      <Card title="Card Title" description="Card description text" footer="Footer">
        Main content
      </Card>
    );
    expect(screen.getByText("Card Title")).toBeInTheDocument();
    expect(screen.getByText("Card description text")).toBeInTheDocument();
    expect(screen.getByText("Main content")).toBeInTheDocument();
    expect(screen.getByText("Footer")).toBeInTheDocument();
  });

  it("does not apply interactive affordances unless clickable", () => {
    const { container } = render(<Card variant="interactive">Content</Card>);
    expect(container.firstElementChild?.className).not.toMatch(/cursor-pointer/);
  });

  it("applies interactive affordances when onClick is provided", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    const { container } = render(
      <Card variant="interactive" onClick={() => {}}>
        Content
      </Card>
    );
    expect(container.firstElementChild?.className).toMatch(/cursor-pointer/);
    expect(warn).toHaveBeenCalled();
  });

  it("warns when a clickable card is rendered as a div", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    render(<Card onClick={() => {}}>Content</Card>);
    expect(warn).toHaveBeenCalledWith(expect.stringContaining('as="button"'));
  });

  it("does not warn for clickable semantic elements", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    render(
      <Card as="button" onClick={() => {}}>
        Action
      </Card>
    );
    render(
      <Card as="a" href="/test">
        Link
      </Card>
    );
    expect(warn).not.toHaveBeenCalled();
  });

  it("applies interactive affordances when rendered as an anchor with href", () => {
    const { container } = render(
      <Card as="a" href="/test" variant="interactive">
        Content
      </Card>
    );
    expect(container.firstElementChild?.tagName).toBe("A");
    expect(container.firstElementChild?.className).toMatch(/cursor-pointer/);
  });
});
