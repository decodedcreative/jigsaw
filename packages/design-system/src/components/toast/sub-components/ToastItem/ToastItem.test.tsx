import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, cleanup, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BellIcon, CheckCircleIcon } from "@phosphor-icons/react";
import { ToastRegion } from "../ToastRegion";
import { toast } from "../../toast";
import { clearAllToastQueues, resetToastRegionMounts } from "../../toast.queue";
import { toastVariantIcons } from "./ToastItem.icons";

function renderWithRegion(ui: React.ReactNode, position?: "bottom-right" | "top-left") {
  return render(
    <>
      {ui}
      <ToastRegion position={position} />
    </>
  );
}

afterEach(() => {
  clearAllToastQueues();
  resetToastRegionMounts();
  cleanup();
});

describe("ToastItem", () => {
  it('renders content with role="alert"', async () => {
    renderWithRegion(
      <button type="button" onClick={() => toast({ title: "Success!", duration: 0 })}>
        Show
      </button>
    );

    await userEvent.setup().click(screen.getByRole("button", { name: "Show" }));
    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(screen.getByText("Success!")).toBeInTheDocument();
  });

  it("renders description", async () => {
    renderWithRegion(
      <button
        type="button"
        onClick={() =>
          toast({ title: "Title", description: "Your changes were saved.", duration: 0 })
        }
      >
        Show
      </button>
    );

    await userEvent.setup().click(screen.getByRole("button", { name: "Show" }));
    expect(screen.getByText("Your changes were saved.")).toBeInTheDocument();
  });

  it("renders a close button", async () => {
    renderWithRegion(
      <button type="button" onClick={() => toast({ title: "Test", duration: 0 })}>
        Show
      </button>
    );

    await userEvent.setup().click(screen.getByRole("button", { name: "Show" }));
    expect(screen.getByRole("button", { name: "Close" })).toBeInTheDocument();
  });

  it("closes when close button is clicked", async () => {
    const user = userEvent.setup();
    renderWithRegion(
      <button type="button" onClick={() => toast({ title: "Test", duration: 0 })}>
        Show
      </button>
    );

    await user.click(screen.getByRole("button", { name: "Show" }));
    await user.click(screen.getByRole("button", { name: "Close" }));
    expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument();
  });

  it("closes only the toast whose close button was clicked when multiple are stacked", async () => {
    const user = userEvent.setup();
    renderWithRegion(
      <>
        <button type="button" onClick={() => toast({ title: "Toast A", duration: 0 })}>
          Add A
        </button>
        <button type="button" onClick={() => toast({ title: "Toast B", duration: 0 })}>
          Add B
        </button>
        <button type="button" onClick={() => toast({ title: "Toast C", duration: 0 })}>
          Add C
        </button>
      </>
    );

    await user.click(screen.getByRole("button", { name: "Add A" }));
    await user.click(screen.getByRole("button", { name: "Add B" }));
    await user.click(screen.getByRole("button", { name: "Add C" }));

    const toastA = screen.getByText("Toast A").closest('[role="alertdialog"]');
    expect(toastA).not.toBeNull();
    await user.click(within(toastA as HTMLElement).getByRole("button", { name: "Close" }));

    expect(screen.queryByText("Toast A")).not.toBeInTheDocument();
    expect(screen.getByText("Toast B")).toBeInTheDocument();
    expect(screen.getByText("Toast C")).toBeInTheDocument();
  });

  it("renders action button when action is provided", async () => {
    const onClick = vi.fn();
    renderWithRegion(
      <button
        type="button"
        onClick={() =>
          toast({ title: "Deleted", duration: 0, action: { label: "Undo", onClick } })
        }
      >
        Show
      </button>
    );

    await userEvent.setup().click(screen.getByRole("button", { name: "Show" }));
    expect(screen.getByRole("button", { name: "Undo" })).toBeInTheDocument();
  });

  it("calls action.onClick when action button is clicked", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    renderWithRegion(
      <button
        type="button"
        onClick={() =>
          toast({ title: "Deleted", duration: 0, action: { label: "Undo", onClick } })
        }
      >
        Show
      </button>
    );

    await user.click(screen.getByRole("button", { name: "Show" }));
    await user.click(screen.getByRole("button", { name: "Undo" }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("uses the variant default icon when icon prop is omitted", async () => {
    renderWithRegion(
      <button type="button" onClick={() => toast({ title: "Done", variant: "success", duration: 0 })}>
        Show
      </button>
    );

    await userEvent.setup().click(screen.getByRole("button", { name: "Show" }));
    expect(toastVariantIcons.success).toBe(CheckCircleIcon);
    expect(screen.getByTestId("toast-status-icon").querySelector("svg")).toBeInTheDocument();
  });

  it("uses a custom icon when icon prop is provided", async () => {
    renderWithRegion(
      <button
        type="button"
        onClick={() =>
          toast({ title: "Reminder", variant: "success", icon: BellIcon, duration: 0 })
        }
      >
        Show
      </button>
    );

    await userEvent.setup().click(screen.getByRole("button", { name: "Show" }));
    expect(screen.getByTestId("toast-status-icon").querySelector("svg")).toBeInTheDocument();
    expect(toastVariantIcons.success).not.toBe(BellIcon);
  });

  it("merges className onto the toast root via twMerge", async () => {
    renderWithRegion(
      <button
        type="button"
        onClick={() =>
          toast({ title: "Test", duration: 0, className: "ring-2 ring-brand-primary" })
        }
      >
        Show
      </button>
    );

    await userEvent.setup().click(screen.getByRole("button", { name: "Show" }));
    const shell = screen.getByRole("alertdialog");
    expect(shell).toHaveClass("rounded-lg");
    expect(shell).toHaveClass("ring-2");
    expect(shell).toHaveClass("ring-brand-primary");
  });

  it("lets className override conflicting utilities from CVA defaults", async () => {
    renderWithRegion(
      <button type="button" onClick={() => toast({ title: "Test", duration: 0, className: "p-8" })}>
        Show
      </button>
    );

    await userEvent.setup().click(screen.getByRole("button", { name: "Show" }));
    const shell = screen.getByRole("alertdialog");
    expect(shell).toHaveClass("p-8");
    expect(shell).not.toHaveClass("p-4");
  });
});

describe("ToastRegion stack order", () => {
  it("closes the visually newest toast at the bottom edge (bottom-right stack)", async () => {
    const user = userEvent.setup();
    renderWithRegion(
      <button
        type="button"
        onClick={() => {
          toast({ title: "Toast 1", duration: 0 });
          toast({ title: "Toast 2", duration: 0 });
          toast({ title: "Toast 3", duration: 0 });
        }}
      >
        Add three
      </button>,
      "bottom-right"
    );

    await user.click(screen.getByRole("button", { name: "Add three" }));

    const toast3 = screen.getByText("Toast 3").closest('[role="alertdialog"]');
    expect(toast3).not.toBeNull();
    await user.click(within(toast3 as HTMLElement).getByRole("button", { name: "Close" }));

    expect(screen.getByText("Toast 1")).toBeInTheDocument();
    expect(screen.getByText("Toast 2")).toBeInTheDocument();
    expect(screen.queryByText("Toast 3")).not.toBeInTheDocument();
  });

  it("closes the visually newest toast at the top edge (top-left stack)", async () => {
    const user = userEvent.setup();
    renderWithRegion(
      <button
        type="button"
        onClick={() => {
          toast({ title: "Toast 1", duration: 0 });
          toast({ title: "Toast 2", duration: 0 });
          toast({ title: "Toast 3", duration: 0 });
        }}
      >
        Add three
      </button>,
      "top-left"
    );

    await user.click(screen.getByRole("button", { name: "Add three" }));

    const toast3 = screen.getByText("Toast 3").closest('[role="alertdialog"]');
    expect(toast3).not.toBeNull();
    await user.click(within(toast3 as HTMLElement).getByRole("button", { name: "Close" }));

    expect(screen.getByText("Toast 1")).toBeInTheDocument();
    expect(screen.getByText("Toast 2")).toBeInTheDocument();
    expect(screen.queryByText("Toast 3")).not.toBeInTheDocument();
  });
});
