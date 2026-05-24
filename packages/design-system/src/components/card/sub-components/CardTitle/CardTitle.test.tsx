import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { CardTitle } from "./CardTitle";

afterEach(() => {
  cleanup();
});

describe("CardTitle", () => {
  it("renders children", () => {
    render(<CardTitle>My Card Title</CardTitle>);
    expect(screen.getByText("My Card Title")).toBeInTheDocument();
  });

  it("renders as an h3 element", () => {
    const { container } = render(<CardTitle>Title</CardTitle>);
    expect(container.querySelector("h3")).toBeInTheDocument();
  });

  it("passes additional HTML attributes", () => {
    render(<CardTitle data-testid="card-title">Title</CardTitle>);
    expect(screen.getByTestId("card-title")).toBeInTheDocument();
  });
});
