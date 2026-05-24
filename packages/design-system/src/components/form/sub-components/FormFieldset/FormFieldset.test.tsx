import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { FormFieldset } from "./FormFieldset";

afterEach(() => {
  cleanup();
});

describe("FormFieldset", () => {
  it("renders a group landmark", () => {
    render(<FormFieldset>Fields</FormFieldset>);
    expect(screen.getByRole("group")).toBeInTheDocument();
  });

  it("associates the group with the section label", () => {
    render(<FormFieldset label="Personal Info">Fields</FormFieldset>);
    const group = screen.getByRole("group");
    const heading = screen.getByRole("heading", { name: "Personal Info" });
    expect(group).toHaveAttribute("aria-labelledby", heading.id);
  });

  it("renders children", () => {
    render(<FormFieldset>Field content</FormFieldset>);
    expect(screen.getByText("Field content")).toBeInTheDocument();
  });

  it("does not set aria-labelledby when label is omitted", () => {
    render(<FormFieldset>Fields</FormFieldset>);
    expect(screen.getByRole("group")).not.toHaveAttribute("aria-labelledby");
  });
});
