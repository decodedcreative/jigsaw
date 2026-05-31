import { describe, it, expect, afterEach, vi } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "../button/Button";
import { Modal } from "./Modal";

afterEach(() => {
  cleanup();
});

describe("Modal", () => {
  it("opens when default trigger is clicked", async () => {
    const user = userEvent.setup();
    render(<Modal title="Test Modal">Modal body content</Modal>);
    await user.click(screen.getByRole("button", { name: "Open" }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("opens when custom trigger is clicked", async () => {
    const user = userEvent.setup();
    render(
      <Modal title="Test Modal" trigger={<Button>Open Modal</Button>}>
        Modal body content
      </Modal>
    );
    await user.click(screen.getByRole("button", { name: "Open Modal" }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("displays modal title", async () => {
    const user = userEvent.setup();
    render(
      <Modal title="My Dialog Title" trigger={<Button>Open</Button>}>
        Content
      </Modal>
    );
    await user.click(screen.getByRole("button", { name: "Open" }));
    expect(screen.getByText("My Dialog Title")).toBeInTheDocument();
  });

  it("displays modal body content", async () => {
    const user = userEvent.setup();
    render(
      <Modal title="Dialog" trigger={<Button>Open</Button>}>
        Body text here
      </Modal>
    );
    await user.click(screen.getByRole("button", { name: "Open" }));
    expect(screen.getByText("Body text here")).toBeInTheDocument();
  });

  it("renders footer content with cancel button by default", async () => {
    const user = userEvent.setup();
    render(
      <Modal
        title="Dialog"
        trigger={<Button>Open</Button>}
        footer={<Button>Confirm</Button>}
      >
        Content
      </Modal>
    );
    await user.click(screen.getByRole("button", { name: "Open" }));
    expect(screen.getByRole("button", { name: "Cancel" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Confirm" })).toBeInTheDocument();
  });

  it("renders a close button by default", async () => {
    const user = userEvent.setup();
    render(
      <Modal title="Dialog" trigger={<Button>Open</Button>}>
        Content
      </Modal>
    );
    await user.click(screen.getByRole("button", { name: "Open" }));
    const dialog = screen.getByRole("dialog");
    expect(dialog.querySelectorAll("button").length).toBeGreaterThan(0);
  });

  it("closes when header close button is clicked", async () => {
    const user = userEvent.setup();
    render(
      <Modal title="Dialog" trigger={<Button>Open</Button>}>
        Content
      </Modal>
    );
    await user.click(screen.getByRole("button", { name: "Open" }));
    const dialog = screen.getByRole("dialog");
    const closeButton = dialog.querySelector("button");
    if (closeButton) {
      await user.click(closeButton);
    }
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("does not render close button when showCloseButton is false", async () => {
    const user = userEvent.setup();
    render(
      <Modal title="Dialog" showCloseButton={false} trigger={<Button>Open</Button>}>
        Content
      </Modal>
    );
    await user.click(screen.getByRole("button", { name: "Open" }));
    const dialog = screen.getByRole("dialog");
    expect(dialog.querySelectorAll("button")).toHaveLength(0);
  });

  it("closes when footer cancel button is pressed", async () => {
    const user = userEvent.setup();
    render(
      <Modal
        title="Dialog"
        showCloseButton={false}
        trigger={<Button>Open</Button>}
        footer={<Button>Confirm</Button>}
      >
        Content
      </Modal>
    );
    await user.click(screen.getByRole("button", { name: "Open" }));
    await user.click(screen.getByRole("button", { name: "Cancel" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("does not render cancel button when showCancelButton is false", async () => {
    const user = userEvent.setup();
    render(
      <Modal
        title="Dialog"
        showCloseButton={false}
        showCancelButton={false}
        trigger={<Button>Open</Button>}
        footer={<Button>Confirm</Button>}
      >
        Content
      </Modal>
    );
    await user.click(screen.getByRole("button", { name: "Open" }));
    expect(screen.queryByRole("button", { name: "Cancel" })).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Confirm" })).toBeInTheDocument();
  });

  it("does not close when footer button is pressed without slot close", async () => {
    const user = userEvent.setup();
    const onConfirm = vi.fn();
    render(
      <Modal
        title="Dialog"
        showCloseButton={false}
        showCancelButton={false}
        trigger={<Button>Open</Button>}
        footer={<Button onPress={onConfirm}>Confirm</Button>}
      >
        Content
      </Modal>
    );
    await user.click(screen.getByRole("button", { name: "Open" }));
    await user.click(screen.getByRole("button", { name: "Confirm" }));
    expect(onConfirm).toHaveBeenCalledOnce();
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("closes when footer button has slot close", async () => {
    const user = userEvent.setup();
    const onConfirm = vi.fn();
    render(
      <Modal
        title="Dialog"
        showCloseButton={false}
        showCancelButton={false}
        trigger={<Button>Open</Button>}
        footer={<Button slot="close" onPress={onConfirm}>Confirm</Button>}
      >
        Content
      </Modal>
    );
    await user.click(screen.getByRole("button", { name: "Open" }));
    await user.click(screen.getByRole("button", { name: "Confirm" }));
    expect(onConfirm).toHaveBeenCalledOnce();
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("renders custom header when provided", async () => {
    const user = userEvent.setup();
    render(
      <Modal title="Ignored" trigger={<Button>Open</Button>} header={<span>Custom header</span>}>
        Content
      </Modal>
    );
    await user.click(screen.getByRole("button", { name: "Open" }));
    expect(screen.getByText("Custom header")).toBeInTheDocument();
    expect(screen.queryByText("Ignored")).not.toBeInTheDocument();
  });

  it("modal is not shown initially", () => {
    render(
      <Modal title="Dialog" trigger={<Button>Open</Button>}>
        Content
      </Modal>
    );
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
