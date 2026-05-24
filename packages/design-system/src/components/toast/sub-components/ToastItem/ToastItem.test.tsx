import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ToastItem } from "./ToastItem";

afterEach(() => {
  cleanup();
});

describe("ToastItem", () => {
  const noop = () => {};

  it('renders with role="alert"', () => {
    render(<ToastItem id="1" onClose={noop} />);
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("renders title", () => {
    render(<ToastItem id="1" title="Success!" onClose={noop} />);
    expect(screen.getByText("Success!")).toBeInTheDocument();
  });

  it("renders description", () => {
    render(<ToastItem id="1" description="Your changes were saved." onClose={noop} />);
    expect(screen.getByText("Your changes were saved.")).toBeInTheDocument();
  });

  it('renders a close button with aria-label="Close"', () => {
    render(<ToastItem id="1" title="Test" onClose={noop} />);
    expect(screen.getByRole("button", { name: "Close" })).toBeInTheDocument();
  });

  it("calls onClose when close button is clicked", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<ToastItem id="1" title="Test" onClose={onClose} />);
    await user.click(screen.getByRole("button", { name: "Close" }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("renders action button when action is provided", () => {
    const action = { label: "Undo", onClick: vi.fn() };
    render(<ToastItem id="1" title="Deleted" onClose={noop} action={action} />);
    expect(screen.getByRole("button", { name: "Undo" })).toBeInTheDocument();
  });

  it("calls action.onClick when action button is clicked", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    const action = { label: "Undo", onClick };
    render(<ToastItem id="1" title="Deleted" onClose={noop} action={action} />);
    await user.click(screen.getByRole("button", { name: "Undo" }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("renders default variant", () => {
    render(<ToastItem id="1" title="Info" onClose={noop} variant="default" />);
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("renders success variant", () => {
    render(<ToastItem id="1" title="Done!" onClose={noop} variant="success" />);
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("renders error variant", () => {
    render(<ToastItem id="1" title="Error" onClose={noop} variant="error" />);
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("renders warning variant", () => {
    render(<ToastItem id="1" title="Warning" onClose={noop} variant="warning" />);
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });
});
