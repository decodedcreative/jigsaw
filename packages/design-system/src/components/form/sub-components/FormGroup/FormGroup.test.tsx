import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { FormGroup } from "./FormGroup";

afterEach(() => {
  cleanup();
});

describe("FormGroup", () => {
  it("renders a section element", () => {
    const { container } = render(<FormGroup>Fields</FormGroup>);
    expect(container.querySelector("section")).toBeInTheDocument();
  });

  it("does not expose a group landmark", () => {
    render(<FormGroup title="Personal Info">Fields</FormGroup>);
    expect(screen.queryByRole("group")).not.toBeInTheDocument();
  });

  it("associates the section with the title heading", () => {
    render(<FormGroup title="Personal Info">Fields</FormGroup>);
    const section = screen.getByRole("region", { name: "Personal Info" });
    const heading = screen.getByRole("heading", { name: "Personal Info" });
    expect(section).toHaveAttribute("aria-labelledby", heading.id);
  });

  it("renders children", () => {
    render(<FormGroup>Field content</FormGroup>);
    expect(screen.getByText("Field content")).toBeInTheDocument();
  });

  it("does not set aria-labelledby when title is omitted", () => {
    const { container } = render(<FormGroup>Fields</FormGroup>);
    expect(container.querySelector("section")).not.toHaveAttribute("aria-labelledby");
  });
});
