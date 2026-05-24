import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { CardContent } from "./CardContent";

afterEach(() => {
  cleanup();
});

describe("CardContent", () => {
  it("renders children", () => {
    render(<CardContent>Content area</CardContent>);
    expect(screen.getByText("Content area")).toBeInTheDocument();
  });

  it("renders as a div element", () => {
    const { container } = render(<CardContent>Content</CardContent>);
    expect(container.querySelector("div")).toBeInTheDocument();
  });
});
