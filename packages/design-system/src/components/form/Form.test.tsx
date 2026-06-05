import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Input } from "../input/Input";
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

  it("exposes Form.Group as a compound sub-component", () => {
    expect(Form.Group).toBeDefined();
    expect(Form.Group.displayName).toBe("DS_Form.Group");
  });

  it("applies side label layout to fields inside the form", () => {
    const { container } = render(
      <Form labelPosition="side">
        <Input label="Email" description="Work email" />
      </Form>
    );
    const field = container.querySelector("form")?.firstElementChild;
    expect(field?.children).toHaveLength(2);
    expect(field?.children[1]?.tagName).toBe("DIV");
    expect(field?.children[1]).toContainElement(screen.getByRole("textbox"));
    expect(field?.children[1]).toHaveTextContent("Work email");
  });

  it("sets data-label-position from labelPosition prop", () => {
    const { container } = render(<Form labelPosition="side">Content</Form>);
    expect(container.querySelector("form")).toHaveAttribute("data-label-position", "side");
  });

  it("renders Form.Group as a section inside the form", () => {
    const { container } = render(
      <Form>
        <Form.Group title="Account details">Field content</Form.Group>
      </Form>
    );
    expect(container.querySelector("form section")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Account details" })).toBeInTheDocument();
    expect(screen.getByText("Field content")).toBeInTheDocument();
  });
});
