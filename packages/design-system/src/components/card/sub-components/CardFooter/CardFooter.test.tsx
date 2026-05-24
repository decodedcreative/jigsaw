import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { CardFooter } from "./CardFooter";

afterEach(() => {
  cleanup();
});

describe("CardFooter", () => {
  it("renders children", () => {
    render(<CardFooter>Footer content</CardFooter>);
    expect(screen.getByText("Footer content")).toBeInTheDocument();
  });

  it("renders as a div element", () => {
    const { container } = render(<CardFooter>Footer</CardFooter>);
    expect(container.querySelector("div")).toBeInTheDocument();
  });
});
