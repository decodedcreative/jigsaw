import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, cleanup, waitFor, fireEvent, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ToastRegion } from "./ToastRegion";
import { toast } from "../../toast";
import { clearAllToastQueues, resetToastRegionMounts } from "../../toast.queue";

afterEach(() => {
  clearAllToastQueues();
  resetToastRegionMounts();
  cleanup();
  vi.restoreAllMocks();
  vi.useRealTimers();
});

describe("toast() — region integration", () => {
  it("warns in development when no ToastRegion is mounted", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    toast({ title: "Hello!", duration: 0 });
    expect(warn).toHaveBeenCalledWith(
      expect.stringContaining("no <ToastRegion /> mounted")
    );
  });

  it("warns when posting to an unmounted region id", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    render(<ToastRegion region="default" />);
    toast({ title: "Hi", duration: 0 }, { region: "top" });
    expect(warn).toHaveBeenCalledWith(expect.stringContaining('region "top"'));
  });

  it("toast.close removes a toast from the default region", async () => {
    const user = userEvent.setup();
    render(
      <>
        <button
          type="button"
          onClick={() => {
            const key = toast({ title: "Removable", duration: 0 });
            (window as Window & { __toastKey?: string }).__toastKey = key;
          }}
        >
          Add
        </button>
        <ToastRegion />
      </>
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
      render(
        <>
          <button type="button" onClick={() => toast({ title: "Temporary" })}>
            Add
          </button>
          <ToastRegion />
        </>
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
});

describe("ToastRegion", () => {
  it("renders a notifications landmark region when toasts are visible", async () => {
    render(
      <>
        <button type="button" onClick={() => toast({ title: "Hello!", duration: 0 })}>
          Show
        </button>
        <ToastRegion />
      </>
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
