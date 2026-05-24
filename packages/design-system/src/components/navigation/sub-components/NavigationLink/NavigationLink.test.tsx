import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { NavigationLink } from "./NavigationLink";

afterEach(() => {
  cleanup();
});

describe("NavigationLink", () => {
  it("renders a link", () => {
    render(<NavigationLink href="/about">About</NavigationLink>);
    expect(screen.getByRole("link", { name: "About" })).toBeInTheDocument();
  });

  it("renders with correct href", () => {
    render(<NavigationLink href="/about">About</NavigationLink>);
    expect(screen.getByRole("link")).toHaveAttribute("href", "/about");
  });

  it('sets aria-current="page" when isCurrent is true', () => {
    render(
      <NavigationLink href="/about" isCurrent>
        About
      </NavigationLink>
    );
    expect(screen.getByRole("link")).toHaveAttribute("aria-current", "page");
  });

  it("does not set aria-current when isCurrent is false", () => {
    render(<NavigationLink href="/about">About</NavigationLink>);
    expect(screen.getByRole("link")).not.toHaveAttribute("aria-current");
  });
});
