import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, cleanup, within, waitFor, fireEvent, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BellIcon } from "@phosphor-icons/react";
import { ToastRegion } from "./ToastRegion";
import { toast } from "../../toast";
import { clearAllToastQueues, resetToastRegionMounts } from "../../toast.queue";

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
  vi.restoreAllMocks();
  vi.useRealTimers();
});

describe("toast()", () => {
  it("warns in development when no ToastRegion is mounted", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    toast({ title: "Hello!", duration: 0 });
    expect(warn).toHaveBeenCalledWith(
      expect.stringContaining("no <ToastRegion /> mounted")
    );
  });

  it('renders a toast with role="alert" when region is mounted', async () => {
    renderWithRegion(
      <button type="button" onClick={() => toast({ title: "Hello!", duration: 0 })}>
        Show Toast
      </button>
    );

    await userEvent.setup().click(screen.getByRole("button", { name: "Show Toast" }));
    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(screen.getByText("Hello!")).toBeInTheDocument();
  });

  it("renders toast with description", async () => {
    renderWithRegion(
      <button
        type="button"
        onClick={() => toast({ title: "Title", description: "Details here", duration: 0 })}
      >
        Add
      </button>
    );

    await userEvent.setup().click(screen.getByRole("button", { name: "Add" }));
    expect(screen.getByText("Details here")).toBeInTheDocument();
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

  it("passes a custom icon through to the toast", async () => {
    renderWithRegion(
      <button
        type="button"
        onClick={() =>
          toast({ title: "Reminder", variant: "success", icon: BellIcon, duration: 0 })
        }
      >
        Add custom icon
      </button>
    );

    await userEvent.setup().click(screen.getByRole("button", { name: "Add custom icon" }));
    expect(screen.getByTestId("toast-status-icon").querySelector("svg")).toBeInTheDocument();
    expect(screen.getByText("Reminder")).toBeInTheDocument();
  });

  it("passes className through to the toast root", async () => {
    renderWithRegion(
      <button
        type="button"
        onClick={() =>
          toast({ title: "Styled", duration: 0, className: "ring-2 ring-brand-primary" })
        }
      >
        Add styled
      </button>
    );

    await userEvent.setup().click(screen.getByRole("button", { name: "Add styled" }));

    const shell = screen.getByRole("alertdialog");
    expect(shell).toHaveClass("ring-2");
    expect(shell).toHaveClass("ring-brand-primary");
  });

  it("toast.close removes a toast", async () => {
    const user = userEvent.setup();
    renderWithRegion(
      <button
        type="button"
        onClick={() => {
          const key = toast({ title: "Removable", duration: 0 });
          (window as Window & { __toastKey?: string }).__toastKey = key;
        }}
      >
        Add
      </button>
    );

    await user.click(screen.getByRole("button", { name: "Add" }));
    expect(screen.getByRole("alertdialog")).toBeInTheDocument();

    const key = (window as Window & { __toastKey?: string }).__toastKey!;
    toast.close(key);
    await waitFor(() => {
      expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument();
    });
  });

  it("auto-dismisses after the default timeout", () => {
    vi.useFakeTimers();
    try {
      renderWithRegion(
        <button type="button" onClick={() => toast({ title: "Temporary" })}>
          Add
        </button>
      );

      fireEvent.click(screen.getByRole("button", { name: "Add" }));
      expect(screen.getByRole("alertdialog")).toBeInTheDocument();

      act(() => {
        vi.advanceTimersByTime(5000);
      });
      expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument();
    } finally {
      vi.useRealTimers();
    }
  });

  it("warns when posting to an unmounted region id", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    render(<ToastRegion region="default" />);
    toast({ title: "Hi", duration: 0 }, { region: "top" });
    expect(warn).toHaveBeenCalledWith(expect.stringContaining('region "top"'));
  });
});

describe("ToastRegion", () => {
  it("renders a notifications landmark region when toasts are visible", async () => {
    renderWithRegion(
      <button type="button" onClick={() => toast({ title: "Hello!", duration: 0 })}>
        Show
      </button>
    );

    await userEvent.setup().click(screen.getByRole("button", { name: "Show" }));
    expect(screen.getByRole("region", { name: /notification/i })).toBeInTheDocument();
  });

  it("routes toasts to the matching region id only", async () => {
    const user = userEvent.setup();
    render(
      <>
        <button
          type="button"
          onClick={() => toast({ title: "Top toast" }, { region: "top", duration: 0 })}
        >
          Top
        </button>
        <button
          type="button"
          onClick={() => toast({ title: "Bottom toast" }, { region: "bottom", duration: 0 })}
        >
          Bottom
        </button>
        <ToastRegion region="top" position="top-right" />
        <ToastRegion region="bottom" position="bottom-right" />
      </>
    );

    await user.click(screen.getByRole("button", { name: "Top" }));
    expect(screen.getByText("Top toast")).toBeInTheDocument();
    expect(screen.queryByText("Bottom toast")).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Bottom" }));
    expect(screen.getByText("Bottom toast")).toBeInTheDocument();
    expect(screen.getAllByRole("alertdialog")).toHaveLength(2);
  });

  it("warns when duplicate region ids are mounted", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    render(
      <>
        <ToastRegion region="default" />
        <ToastRegion region="default" />
      </>
    );
    expect(warn).toHaveBeenCalledWith(
      expect.stringContaining('Multiple <ToastRegion region="default" />')
    );
  });

  it("toast.close dismisses from the matching region queue", async () => {
    const user = userEvent.setup();
    render(
      <>
        <button
          type="button"
          onClick={() => {
            const key = toast({ title: "Top only" }, { region: "top", duration: 0 });
            (window as Window & { __topKey?: string }).__topKey = key;
          }}
        >
          Add top
        </button>
        <ToastRegion region="top" position="top-right" />
        <ToastRegion region="bottom" position="bottom-right" />
      </>
    );

    await user.click(screen.getByRole("button", { name: "Add top" }));
    expect(screen.getByRole("alertdialog")).toBeInTheDocument();

    const key = (window as Window & { __topKey?: string }).__topKey!;
    toast.close(key, "top");
    await waitFor(() => {
      expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument();
    });
  });
});
