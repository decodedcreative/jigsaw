import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { GearIcon } from "@phosphor-icons/react";
import { Icon } from "./Icon";

afterEach(() => {
  cleanup();
});

describe("Icon", () => {
  it("renders the provided phosphor icon", () => {
    const { container } = render(<Icon icon={GearIcon} aria-hidden />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("applies default md size classes", () => {
    const { container } = render(<Icon icon={GearIcon} />);
    expect(container.querySelector("svg")).toHaveClass("h-4", "w-4");
  });

  it("applies size variant classes", () => {
    const { container } = render(<Icon icon={GearIcon} size="sm" />);
    expect(container.querySelector("svg")).toHaveClass("h-3.5", "w-3.5");
  });

  it("applies tone variant classes", () => {
    const { container } = render(<Icon icon={GearIcon} tone="accent" />);
    expect(container.querySelector("svg")).toHaveClass("text-interactive-accent");
  });

  it("does not apply a tone class by default", () => {
    const { container } = render(<Icon icon={GearIcon} />);
    const svg = container.querySelector("svg");
    expect(svg).not.toHaveClass("text-foreground-primary");
    expect(svg).not.toHaveClass("text-interactive-accent");
  });

  it("inherits currentColor from the parent", () => {
    const { container } = render(
      <span className="text-interactive-accent">
        <Icon icon={GearIcon} />
      </span>
    );
    expect(container.querySelector("span")).toHaveClass("text-interactive-accent");
    expect(container.querySelector("svg")).not.toHaveClass("text-interactive-accent");
  });

  it("merges classNameOverrides for jailbreak styling", () => {
    const { container } = render(
      <Icon icon={GearIcon} size="md" classNameOverrides={{ component: "h-6 w-6 text-foreground-primary" }} />
    );
    const svg = container.querySelector("svg");
    expect(svg).toHaveClass("h-6", "w-6", "text-foreground-primary");
  });

  it("defaults to decorative with aria-hidden", () => {
    const { container } = render(<Icon icon={GearIcon} />);
    expect(container.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
  });

  it("supports accessible labeling when aria-hidden is false", () => {
    render(<Icon icon={GearIcon} aria-hidden={false} aria-label="Settings" />);
    expect(screen.getByLabelText("Settings")).toBeInTheDocument();
  });
});
