import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup, within } from "@testing-library/react";
import { renderHook } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BellIcon } from "@phosphor-icons/react";
import { useToast } from "../../Toast.context";
import { ToastProvider } from "./ToastProvider";

afterEach(() => {
  cleanup();
});

describe("useToast", () => {
  it("throws when used outside of ToastProvider", () => {
    const { result } = renderHook(() => {
      try {
        return useToast();
      } catch (e) {
        return e;
      }
    });
    expect(result.current).toBeInstanceOf(Error);
    expect((result.current as Error).message).toMatch(/ToastProvider/);
  });

  it("returns addToast and removeToast when used inside ToastProvider", () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ToastProvider>{children}</ToastProvider>
    );
    const { result } = renderHook(() => useToast(), { wrapper });
    expect(typeof result.current.addToast).toBe("function");
    expect(typeof result.current.removeToast).toBe("function");
    expect(Array.isArray(result.current.toasts)).toBe(true);
  });
});

describe("ToastProvider", () => {
  it("renders children", () => {
    render(
      <ToastProvider>
        <span>App content</span>
      </ToastProvider>
    );
    expect(screen.getByText("App content")).toBeInTheDocument();
  });

  it('addToast renders a toast with role="alert"', async () => {
    const TestComponent = () => {
      const { addToast } = useToast();
      return (
        <button type="button" onClick={() => addToast({ title: "Hello!", duration: 0 })}>
          Show Toast
        </button>
      );
    };

    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );

    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: "Show Toast" }));
    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(screen.getByText("Hello!")).toBeInTheDocument();
  });

  it("renders toast with description", async () => {
    const TestComponent = () => {
      const { addToast } = useToast();
      return (
        <button
          type="button"
          onClick={() => addToast({ title: "Title", description: "Details here", duration: 0 })}
        >
          Add
        </button>
      );
    };

    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );

    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: "Add" }));
    expect(screen.getByText("Details here")).toBeInTheDocument();
  });

  it("closes only the toast whose close button was clicked when multiple are stacked", async () => {
    const TestComponent = () => {
      const { addToast } = useToast();
      return (
        <>
          <button type="button" onClick={() => addToast({ title: "Toast A", duration: 0 })}>
            Add A
          </button>
          <button type="button" onClick={() => addToast({ title: "Toast B", duration: 0 })}>
            Add B
          </button>
          <button type="button" onClick={() => addToast({ title: "Toast C", duration: 0 })}>
            Add C
          </button>
        </>
      );
    };

    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );

    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: "Add A" }));
    await user.click(screen.getByRole("button", { name: "Add B" }));
    await user.click(screen.getByRole("button", { name: "Add C" }));

    const toastA = screen.getByText("Toast A").closest('[role="alert"]');
    expect(toastA).not.toBeNull();
    await user.click(within(toastA as HTMLElement).getByRole("button", { name: "Close" }));

    expect(screen.queryByText("Toast A")).not.toBeInTheDocument();
    expect(screen.getByText("Toast B")).toBeInTheDocument();
    expect(screen.getByText("Toast C")).toBeInTheDocument();
  });

  it("closes the visually newest toast at the bottom edge (bottom-right stack)", async () => {
    const TestComponent = () => {
      const { addToast } = useToast();
      return (
        <button
          type="button"
          onClick={() => {
            addToast({ title: "Toast 1", duration: 0 });
            addToast({ title: "Toast 2", duration: 0 });
            addToast({ title: "Toast 3", duration: 0 });
          }}
        >
          Add three
        </button>
      );
    };

    render(
      <ToastProvider position="bottom-right">
        <TestComponent />
      </ToastProvider>
    );

    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: "Add three" }));

    const toast3 = screen.getByText("Toast 3").closest('[role="alert"]');
    expect(toast3).not.toBeNull();
    await user.click(within(toast3 as HTMLElement).getByRole("button", { name: "Close" }));

    expect(screen.getByText("Toast 1")).toBeInTheDocument();
    expect(screen.getByText("Toast 2")).toBeInTheDocument();
    expect(screen.queryByText("Toast 3")).not.toBeInTheDocument();
  });

  it("closes the visually newest toast at the top edge (top-left stack)", async () => {
    const TestComponent = () => {
      const { addToast } = useToast();
      return (
        <button
          type="button"
          onClick={() => {
            addToast({ title: "Toast 1", duration: 0 });
            addToast({ title: "Toast 2", duration: 0 });
            addToast({ title: "Toast 3", duration: 0 });
          }}
        >
          Add three
        </button>
      );
    };

    render(
      <ToastProvider position="top-left">
        <TestComponent />
      </ToastProvider>
    );

    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: "Add three" }));

    const toast3 = screen.getByText("Toast 3").closest('[role="alert"]');
    expect(toast3).not.toBeNull();
    await user.click(within(toast3 as HTMLElement).getByRole("button", { name: "Close" }));

    expect(screen.getByText("Toast 1")).toBeInTheDocument();
    expect(screen.getByText("Toast 2")).toBeInTheDocument();
    expect(screen.queryByText("Toast 3")).not.toBeInTheDocument();
  });

  it("addToast passes a custom icon through to ToastItem", async () => {
    const TestComponent = () => {
      const { addToast } = useToast();
      return (
        <button
          type="button"
          onClick={() =>
            addToast({
              title: "Reminder",
              variant: "success",
              icon: BellIcon,
              duration: 0,
            })
          }
        >
          Add custom icon
        </button>
      );
    };

    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );

    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: "Add custom icon" }));
    expect(screen.getByTestId("toast-status-icon").querySelector("svg")).toBeInTheDocument();
    expect(screen.getByText("Reminder")).toBeInTheDocument();
  });

  it("addToast passes className through to ToastItem root", async () => {
    const TestComponent = () => {
      const { addToast } = useToast();
      return (
        <button
          type="button"
          onClick={() =>
            addToast({ title: "Styled", duration: 0, className: "ring-2 ring-brand-primary" })
          }
        >
          Add styled
        </button>
      );
    };

    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );

    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: "Add styled" }));

    const alert = screen.getByRole("alert");
    expect(alert).toHaveClass("ring-2");
    expect(alert).toHaveClass("ring-brand-primary");
  });

  it("removeToast removes a toast", async () => {
    const TestComponent = () => {
      const { addToast, removeToast, toasts } = useToast();
      return (
        <>
          <button type="button" onClick={() => addToast({ title: "Removable", duration: 0 })}>
            Add
          </button>
          {toasts.map((t) => (
            <button key={t.id} type="button" onClick={() => removeToast(t.id)}>
              Remove
            </button>
          ))}
        </>
      );
    };

    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );

    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: "Add" }));
    expect(screen.getByRole("alert")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Remove" }));
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });
});
