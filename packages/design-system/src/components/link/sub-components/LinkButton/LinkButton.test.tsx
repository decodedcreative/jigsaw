import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { LinkButton } from "./LinkButton";

afterEach(() => {
  cleanup();
});

describe("LinkButton", () => {
  it("renders a link element", () => {
    render(<LinkButton href="/action">Take Action</LinkButton>);
    expect(screen.getByRole("link", { name: "Take Action" })).toBeInTheDocument();
  });

  it("renders with href", () => {
    render(<LinkButton href="/action">Action</LinkButton>);
    expect(screen.getByRole("link")).toHaveAttribute("href", "/action");
  });

  it("renders primary variant by default", () => {
    render(<LinkButton href="/">Primary</LinkButton>);
    expect(screen.getByRole("link")).toBeInTheDocument();
  });

  it("renders secondary variant", () => {
    render(
      <LinkButton href="/" variant="secondary">
        Secondary
      </LinkButton>
    );
    expect(screen.getByRole("link")).toBeInTheDocument();
  });

  it("renders outline variant", () => {
    render(
      <LinkButton href="/" variant="outline">
        Outline
      </LinkButton>
    );
    expect(screen.getByRole("link")).toBeInTheDocument();
  });
});
