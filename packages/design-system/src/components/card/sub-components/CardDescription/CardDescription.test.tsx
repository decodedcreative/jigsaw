import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { CardDescription } from "./CardDescription";

afterEach(() => {
  cleanup();
});

describe("CardDescription", () => {
  it("renders children", () => {
    render(<CardDescription>Some description</CardDescription>);
    expect(screen.getByText("Some description")).toBeInTheDocument();
  });

  it("renders as a p element", () => {
    const { container } = render(<CardDescription>Description</CardDescription>);
    expect(container.querySelector("p")).toBeInTheDocument();
  });
});
