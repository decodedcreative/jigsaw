import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Navigation } from "./Navigation";
import { NavigationLink } from "./sub-components/NavigationLink";

afterEach(() => {
  cleanup();
});

describe("Navigation", () => {
  it("renders a nav element", () => {
    render(<Navigation />);
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });

  it("renders brand, links, and actions slots", () => {
    render(
      <Navigation
        brand={<span>Brand</span>}
        links={<NavigationLink href="/home">Home</NavigationLink>}
        actions={<button type="button">Sign in</button>}
      />
    );
    expect(screen.getByText("Brand")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Sign in" })).toBeInTheDocument();
  });

  it("passes additional HTML attributes", () => {
    render(<Navigation aria-label="Main navigation" />);
    expect(screen.getByRole("navigation", { name: "Main navigation" })).toBeInTheDocument();
  });

  it("keeps the links panel closed until the menu is toggled", () => {
    render(
      <Navigation
        links={
          <>
            <NavigationLink href="/home">Home</NavigationLink>
            <NavigationLink href="/about">About</NavigationLink>
          </>
        }
      />
    );
    expect(screen.getByTestId("navigation-links")).not.toHaveAttribute("data-open");
  });

  it("opens the links panel when the mobile menu is toggled", async () => {
    const user = userEvent.setup();
    render(
      <Navigation
        links={
          <>
            <NavigationLink href="/home">Home</NavigationLink>
            <NavigationLink href="/about" isCurrent>
              About
            </NavigationLink>
          </>
        }
      />
    );

    await user.click(screen.getByRole("button", { name: "Toggle menu" }));
    expect(screen.getByTestId("navigation-links")).toHaveAttribute("data-open");
    expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "About" })).toHaveAttribute("aria-current", "page");
  });

  it("calls onMobileOpenChange when the toggle is clicked", async () => {
    const user = userEvent.setup();
    const onMobileOpenChange = vi.fn();
    render(
      <Navigation links={<NavigationLink href="/home">Home</NavigationLink>} onMobileOpenChange={onMobileOpenChange} />
    );

    await user.click(screen.getByRole("button", { name: "Toggle menu" }));
    expect(onMobileOpenChange).toHaveBeenCalledWith(true);
  });

  it("closes the links panel when a link is pressed", async () => {
    const user = userEvent.setup();
    render(
      <Navigation
        links={
          <>
            <NavigationLink href="/home">Home</NavigationLink>
            <NavigationLink href="/about">About</NavigationLink>
          </>
        }
      />
    );

    await user.click(screen.getByRole("button", { name: "Toggle menu" }));
    await user.click(screen.getByRole("link", { name: "Home" }));
    expect(screen.getByTestId("navigation-links")).not.toHaveAttribute("data-open");
  });
});
