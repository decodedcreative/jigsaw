import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { CardHeader } from "./CardHeader";

afterEach(() => {
  cleanup();
});

describe("CardHeader", () => {
  it("renders children", () => {
    render(<CardHeader>Header</CardHeader>);
    expect(screen.getByText("Header")).toBeInTheDocument();
  });

  it("renders as a div element", () => {
    const { container } = render(<CardHeader>Header</CardHeader>);
    expect(container.querySelector("div")).toBeInTheDocument();
  });
});
