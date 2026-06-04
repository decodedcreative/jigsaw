import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Form } from "./Form";

afterEach(() => {
  cleanup();
});

describe("Form", () => {
  it("renders a form element", () => {
    const { container } = render(<Form>Form content</Form>);
    expect(container.querySelector("form")).toBeInTheDocument();
  });

  it("renders children", () => {
    render(<Form>Form content</Form>);
    expect(screen.getByText("Form content")).toBeInTheDocument();
  });

  it("calls onSubmit when submitted", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn((e) => e.preventDefault());
    render(
      <Form onSubmit={onSubmit}>
        <button type="submit">Submit</button>
      </Form>
    );
    await user.click(screen.getByRole("button", { name: "Submit" }));
    expect(onSubmit).toHaveBeenCalled();
  });

  it("passes additional attributes", () => {
    const { container } = render(<Form data-testid="my-form">Content</Form>);
    expect(container.querySelector("form[data-testid='my-form']")).toBeInTheDocument();
  });
});
