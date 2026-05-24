import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { CardImage } from "./CardImage";

afterEach(() => {
  cleanup();
});

describe("CardImage", () => {
  it("renders an img element", () => {
    render(<CardImage src="https://example.com/img.jpg" alt="Card image" />);
    expect(screen.getByRole("img")).toBeInTheDocument();
  });

  it("renders with correct src and alt", () => {
    render(<CardImage src="https://example.com/img.jpg" alt="Card image" />);
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", "https://example.com/img.jpg");
    expect(img).toHaveAttribute("alt", "Card image");
  });
});
